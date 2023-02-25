const index = (req, res) => {
    // const nome = `
    // PANELA CRAFT`
    // res.render("main/index", {
    //     nome: nome,
    // })
    res.render("main/index")
}
const about = (req, res) => {
    res.render("main/about")
}

const ui = (req, res) => {
    res.render("main/ui");
}

const game = (req, res) => {
    res.render("main/game")
}

const signup = (req, res) => {
    res.render("main/signup")
}

module.exports = { index, about, ui, game, signup}