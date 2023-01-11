const index = (req, res) => {
    const nome = `
    PANELA CRAFT`
    res.render("main/index", {
        nome: nome,
    })
}
const about = (req, res) => {
    res.render("main/about")
}

module.exports = { index, about }