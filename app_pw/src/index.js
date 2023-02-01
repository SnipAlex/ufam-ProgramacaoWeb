const express = require("express")
const handlebars = require("express-handlebars")
const sass = require("node-sass-middleware")
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

app.use(sass({
    src: `${__dirname}/public/scss`,
    dest: `${__dirname}/public/css`
    
}));

app.use("/img", [
    express.static(`${__dirname}/../public/img`)
])

app.use(router)

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`)
})