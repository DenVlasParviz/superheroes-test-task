const db = require('../sequelize/index');
const {Superhero, Image} = require('../models/index');
const fs = require('fs');
const path = require('path')
const {deleteFileFromUploads} = require('../utils/file')

class SuperheroesController {





// POST: http://localhost:3000/api/superheroes сreate a supehero
    async createSuperhero(req, res) {
        const transaction = await db.transaction();
        try {
            const {
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase
            } = req.body;

            if (!req.files || !req.files.length) {
                return res.status(400).json({error: "at least one image is required"});
            }
            const existingHero = await Superhero.findOne({where: {nickname},transaction});
            if (existingHero) {
                return res.status(400).json({error: "Superhero with this nickname already exists"});
            }
            const hero = await Superhero.create({
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase
            },{transaction});
            const imagePromises = req.files.map(file =>
                Image.create({
                    superhero_id: hero.id,
                    url: file.filename
                }, { transaction })
            );
            await Promise.all(imagePromises);
            await transaction.commit();





            const heroImg = await Superhero.findByPk(hero.id, {
                include: {model: Image, as: 'images'}
            })

//TODO change heroimg to a normal name
            return res.status(201).json(heroImg);


        } catch (e) {
            await transaction.rollback();
            console.error("Error creating superhero:", e);
            return res.status(500).json({error: "Internal server error"});
        }
    }

    async getAllSuperheroes(req, res) {

        try {

            const result = await Superhero.findAll({
                attributes: ["id", "nickname", "real_name", "origin_description"],
                include: {
                    model: Image,
                    as: 'images',
                    attributes: ['url']
                }
            });

            // edit url for uploads file folder
            const resultWithUrl = result.map(hero => ({
                ...hero.toJSON(),
                images: hero.images.map(img => ({
                    url: `/uploads/${img.url.split('\\').pop().split('/').pop()}`
                }))
            }));

            return res.json(resultWithUrl);



        } catch (e) {
            console.error("Error fetching superhero:", e);
            return res.status(500).json({error: "Internal server error"});
        }
    }

    async getHeroByName(req, res) {
        try {

            const nickname = req.params.nickname;
            const result = await Superhero.findOne({
                where: { nickname },
                include: {
                    model: Image,
                    as: 'images',
                    attributes: ['url']
                }
            });
            if (!result) {
                return res.status(404).json({error: "Superhero not found"});
            }
            const heroWithUrl = {
                ...result.toJSON(),
                images: result.images.map(img => ({
                    url: `/uploads/${img.url.split('\\').pop().split('/').pop()}`
                }))
            };

            res.json(heroWithUrl)
        } catch (e) {
            console.error("Error fetching superhero:", e);
            return res.status(500).json({error: "Internal server error"});
        }
    }


    async updateSuperhero(req, res) {
        try {
            const {
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase,
                oldImages = []
            } = req.body;

            const hero = await Superhero.findOne({where:{nickname},include:{
                model: Image,
                    as:'images'
                }});
            if (!hero) {
                return res.status(404).json({error: "Superhero not found"});
            }
            if (nickname && nickname !== hero.nickname) {
                const existingHero = await Superhero.findOne({where: {nickname}});
                if (existingHero) {
                    return res.status(400).json({error: "Superhero with this nickname already exists"});
                }
            }
            const imagesToDelete = hero.images.filter(img => !oldImages.includes(img.url));
            for (const img of imagesToDelete) {
                deleteFileFromUploads(img.url);

                await img.destroy();

            }

            if (req.files && req.files.length) {
                for (const file of req.files) {

                    await Image.create({ superhero_id: hero.id, url: file.filename });
                }
            }
        await hero.update({
            nickname: nickname ?? hero.nickname,
            real_name: real_name ?? hero.real_name,
            origin_description: origin_description ?? hero.origin_description,
            superpowers: superpowers ?? hero.superpowers,
            catch_phrase: catch_phrase ?? hero.catch_phrase
        });
        return res.json(hero)
        }
        catch
            (err)
            {
                console.error("Error updating superhero:", err);
                return res.status(500).json({error: "Internal server error"});
            }
        }

        async deleteSuperhero(req, res)
        {
            const transaction = await db.transaction();

            try {

                const {id} = req.params;
                const hero = await Superhero.findByPk(id, {
                    include: {
                        model: Image,
                        as: 'images'
                    },transaction
                });


                if (!hero) {
                    await transaction.rollback();

                    return res.status(404).json({error: "Superhero not found"});
                }

                if (hero.images && hero.images.length > 0) {
                    for (let i = 0; i < hero.images.length; i++) {
                        const img = hero.images[i];
                        console.log(img.url);
                        deleteFileFromUploads(img.url);
                        await img.destroy({ transaction });
                    }
                }
                await hero.destroy({ transaction });

                await transaction.commit();


                return res.json({message: "Superhero deleted successfully"});


            } catch (err) {
                await transaction.rollback();

                console.error("Error deleting superhero:", err);
                return res.status(500).json({error: "Internal server error"});
            }
        }

    }


    module.exports = new SuperheroesController();
