const express = require("express")
const handlebars = require("express-handlebars")
const logger = require("./middlewares/logger")
const router = require("./router/router")
const app = express()
const PORT = 3000


app.use(logger())

app.engine("handlebars", handlebars.engine()) // Engine de views
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)

app.use("/img", [
    express.static(`${__dirname}/../public/img`)
])

app.use(router)

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`)
})