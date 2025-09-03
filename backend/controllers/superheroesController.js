const db = require('../sequelize/index');
const superhero = require('../models/superheroes');

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

            const hero = await superhero.create({
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase
            });

            return res.status(201).json(hero);


        } catch (e) {
            console.error("Error creating superhero:", e);
            return res.status(500).json({error: "Internal server error"});
        }
    }

    async getAllSuperheroes(req, res) {

        try {

            const result = await superhero.findAll({
                attributes: ["id", "nickname"]
            });
            return res.json(result)

        } catch (e) {
            console.error("Error fetching superhero:", e);
            return res.status(500).json({error: "Internal server error"});
        }
    }

    async getHeroById(req, res) {
        try {

            const id = req.params.id;
            const result = await superhero.findByPk(id);
            if (!result) {
                return res.status(404).json({ error: "Superhero not found" });
            }
            res.json(result)
        } catch (e) {
            console.error("Error fetching superhero:", e);
            return res.status(500).json({error: "Internal server error"});
        }
    }


    async updateSuperhero(req, res) {
try{


        const {id} = req.params;
        const {
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase
        } = req.body;

        const hero = await superhero.findByPk(id);
        if (!hero) {
            return res.status(404).json({ error: "Superhero not found" });
        }
        await hero.update({
            nickname: nickname ?? hero.nickname,
            real_name: real_name ?? hero.real_name,
            origin_description: origin_description ?? hero.origin_description,
            superpowers: superpowers ?? hero.superpowers,
            catch_phrase: catch_phrase ?? hero.catch_phrase
        });
        return res.json(hero);


    }catch (err) {
    console.error("Error updating superhero:", err);
    return res.status(500).json({ error: "Internal server error" });
}
    }

    async deleteSuperhero(req,res){
        try{
        const {id} = req.params;
const hero = await superhero.findByPk(id);
        if (!hero) {
            return res.status(404).json({ error: "Superhero not found" });
        }
        await hero.destroy()

        return res.json({ message: "Superhero deleted successfully" });



    }catch (err) {
            console.error("Error deleting superhero:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

}


module.exports = new SuperheroesController();
