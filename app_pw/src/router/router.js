const express = require("express")
const router = express.Router()
const mainController = require("../controllers/main")
const cursoController = require("../controllers/curso")
const areaController = require("../controllers/area")
// Main controller
router.get("/", mainController.index);
router.get("/about", mainController.about);
router.get("/ui", mainController.ui);

// Area controller
router.get("/areas", areaController.index);

// User controller
// Controlador Curso aAinda tem que programar o resto do CRUD
// router.get("/curso", cursoController.index)
// router.get("/curso/create", cursoController.create)
// router.post("/curso/create", cursoController.create)
// router.get("/curso/:id", cursoController.read)
// router.post("/curso/:id", cursoController.update)
// router.get("/curso/:id", cursoController.remove)

module.exports = router