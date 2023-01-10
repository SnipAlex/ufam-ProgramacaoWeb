const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    const nome = `
    PANELA CRAFT`
    res.render("index", {
        nome: nome,
        layout: false
    })
})

router.get("/about", (req, res) => {
    res.send("Hellor world")
})

module.exports = router