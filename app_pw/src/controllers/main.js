const models = require("../models");

const index = (req, res) => {
    // const nome = `
    // PANELA CRAFT`
    // res.render("main/index", {
    //     nome: nome,
    // })
    res.render("main/index")
}
// Vai da erro aqui pq não existe models curso, tem que fazer.
const signup = async(req, res) => { 
    if(req.route.methods.get) {
        const cursos = await Curso.findAll()
        res.render("main/signup", {
            cursos: cursos.map(curso => curso.toJSON()),
            csrf: req.csrfToken()
        });
    } else {
        res.send(req.body);
    }
}

const sign = (req, res) => {}

const logout = (req, res) => {}

const about = (req, res) => {
    res.render("main/about")
}

module.exports = { index, about, signup }