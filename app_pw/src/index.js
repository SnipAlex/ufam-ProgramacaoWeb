const express = require("express")
const handlebars = require("express-handlebars")
const cookieParser = require("cookie-parser")
const csurf = require("csurf")
const logger = require("./middlewares/logger")
const router = require("./router/router")
const app = express()
const PORT = 3000


app.use(logger())

app.engine("handlebars", handlebars.engine({
    helpers: require(`${__dirname}/views/helpers/helpers`)
})) // Engine de views
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)

app.use("/img", [
    express.static(`${__dirname}/../public/img`)
])
app.use(cookieParser())
app.use(csurf({cookie: true}));
app.get("/test-cookie", (req, res) => {
    if(!('nome' in req.cookies)){
        res.cookie('nome', 'valor')
        res.send("Voce não passou aqui")
    } else {
        res.send("Voce ja passou aqui")
    }
})

app.use(router)

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`)
})