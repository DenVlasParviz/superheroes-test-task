const router = require("express").Router();
const controller = require("../../controllers/superheroesController");
const upload = require('../../middleware/multer')

router.post("/", upload.array('newImages'),controller.createSuperhero);
router.get("/getAll", controller.getAllSuperheroes);
router.get(`/getHero/:nickname`,controller.getHeroByName)
router.put("/edit/:nickname",upload.array('newImages'), controller.updateSuperhero);
router.delete("/:id", controller.deleteSuperhero);
module.exports = router;
