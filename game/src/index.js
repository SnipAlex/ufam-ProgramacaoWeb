const express = require("express")
const handlebars = require("express-handlebars")
const cookieParser = require("cookie-parser")
const csurf = require("csurf")
const sass = require("node-sass-middleware")
const morgan = require("morgan")
const uuid = require("uuid")
const session = require("express-session")
const router = require("./router/router")
const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: false }));
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
    express.static(`${__dirname}/../node_modules/bootstrap/dist/js/`),
    express.static(`${__dirname}/../node_modules/@popperjs/core/dist/umd/`),
]);

app.get("/uuid", (req, res) => {
    res.send(uuid.v4());
})

app.use(cookieParser())
app.use(csurf({cookie: true}));
app.get("/cookie", (req, res) => {
    if(!('nome' in req.cookies)){
        res.cookie('nome', 'valor')
        res.send("Voce não passou aqui")
    } else {
        res.send("Voce ja passou aqui")
    }
})

app.use(session({
    genid: (req) => {
        return uuid.v4() // usamos UUIDs para gerar os SESSID
    },
    secret: 'Hi9Cf#mK98',
    resave: false,
    saveUninitialized: true
}))

app.get("/session", (req, res) => {
    if(!('qtdVezes' in req.session)) {
        req.session.qtdVezes = 0;
        res.send("Primeira sessão");
    }
    else
    {
        res.send("Sessões na conta: "+ req.session.qtdVezes);
        req.session.qtdVezes++;
    }
});

app.use(router)
app.use(morgan("short"))

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`)
})