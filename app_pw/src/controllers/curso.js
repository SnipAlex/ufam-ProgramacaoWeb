const models = require("../models");
const Curso = models.Curso;
const Area = models.Area;

const index = async(req, res) => {
    try {
        const cursos = await Curso.findAll();
        res.render('curso/index', {
            cursos: cursos.map((curso) => curso.toJSON())
        })
    }
    catch (e){
        console.log(e);
        res.status(500).json(error);
    }
}

const create = async(req, res) => {
    if(req.route.methods.get){
        res.render("curso/create");
    } else {
        const curso = req.body
        try{
            await Curso.create(curso);
            res.redirect("/curso");
        } catch (e){
            console.log(e);
            res.status(500).json(error);
        }
    }
}

const read = async(req, res) => {
    const { id } = req.params;
    try {
        const curso = await Curso.findByPK(id, { include: Area});
        res.render("curso/read", { curso: curso.toJSON() });
    } catch (error) {
        console.log(error)
    }
}

const update = async(req, res) => {
    const { id } = req.params
    try {
        const found = await Curso.update(req.body, {where:{id:id}})
        if(found) res.send({msg: "atualizado"})
        else res.status(404).json({msg: "Produto não encontrado"})
    } catch (error) {
        res.status(500).json(error);
    }
}

const remove = async(req, res) => {
    const { id } = req.params;
    try {
        await Curso.destroy({ where: { id: id } });
        res.redirect("/curso");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports = {index, create, read, update, remove}