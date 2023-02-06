const express = require("express")
const handlebars = require("express-handlebars")
const session = require('express-session')
const cookieParser = require("cookie-parser")
const csurf = require("csurf")
const uuid = require("uuid")
const sass = require("node-sass-middleware")
const morgan = require("morgan")
const router = require("./router/router")

const app = express()
const PORT = 3000


app.use(morgan("short"))

app.engine("handlebars", handlebars.engine({
    layoutsDir: `${__dirname}/views/layouts`,
    helpers: require(`${__dirname}/views/helpers/helpers`)
})) // Engine de views
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)

app.use(sass({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: "compressed",
    prefix: "/css"
}));

app.use("/img", [
    express.static(`${__dirname}/../public/img`)
])
app.use("/css", express.static(`${__dirname}/../public/css`))
app.use("/webfonts", express.static(`${__dirname}/../node_modules/@fortawesome/fontawesome-free/webfonts`))
app.use("/js", [
    express.static(`${__dirname}/../public/js`),
    express.static(`${__dirname}/../node_modules/bootstrap/dist/js`),
]);

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

app.get("/uuid", (req, res) => {
    res.send(uuid.v4());
})

app.use(session({
    genid: (req =>{
        return uuid.v4()
    }),
    secret: 'xX_bigmanaus_Xx',
    resave: true,
    saveUninitialized: true
}));

app.use(router)

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`)
})