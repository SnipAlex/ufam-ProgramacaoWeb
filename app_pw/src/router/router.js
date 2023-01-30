const express = require("express")
const router = express.Router()
const mainController = require("../controllers/main")
const cursoController = require("../controllers/curso")

router.get("/", mainController.index)
router.get("/about", mainController.about)

//Controlador Curso aAinda tem que programar o resto do CRUD
// router.get("/curso", cursoController.index)
// router.get("/curso/create", cursoController.create)
// router.post("/curso/create", cursoController.create)
// router.get("/curso/:id", cursoController.read)
// router.post("/curso/:id", cursoController.update)
// router.get("/curso/:id", cursoController.remove)

module.exports = router