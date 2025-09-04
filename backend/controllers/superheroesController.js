const db = require('../sequelize/index');
const {Superhero, Image} = require('../models/index');

class SuperheroesController {
// POST: http://localhost:3000/api/superheroes сreate a supehero
    async createSuperhero(req, res) {
        try {
            const {
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase
            } = req.body;
            const existingHero = await Superhero.findOne({where: {nickname}});
            console.log(nickname, existingHero,req.body);
            if (existingHero) {
                return res.status(400).json({error: "Superhero with this nickname already exists"});
            }
            const hero = await Superhero.create({
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase
            });

            if (!req.file) {
                return res.status(400).json({error: "Image is required"});
            }

            await Image.create({
                superhero_id: hero.id,
                url: req.file.filename
            });


            const heroImg = await Superhero.findByPk(hero.id, {
                include: {model: Image, as: 'images'}
            })

//TODO change heroimg to a normal name
            return res.status(201).json(heroImg);


        } catch (e) {
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


            const {id} = req.params;
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
            for (const img of imagesToDelete) await img.destroy();
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
            try {
                const {id} = req.params;
                const hero = await Superhero.findByPk(id);
                if (!hero) {
                    return res.status(404).json({error: "Superhero not found"});
                }
                await hero.destroy()

                return res.json({message: "Superhero deleted successfully"});


            } catch (err) {
                console.error("Error deleting superhero:", err);
                return res.status(500).json({error: "Internal server error"});
            }
        }

    }


    module
.
    exports = new SuperheroesController();
