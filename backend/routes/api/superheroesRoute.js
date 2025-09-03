const router = require("express").Router();
const controller = require("../../controllers/superheroesController");

router.post("/", controller.createSuperhero);
router.get("/getAll", controller.getAllSuperheroes);
router.get(`/:id`,controller.getHeroById)
router.put("/:id", controller.updateSuperhero);
router.delete("/:id", controller.deleteSuperhero);
module.exports = router;
