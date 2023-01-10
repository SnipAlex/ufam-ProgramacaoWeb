function logger() {
    return (req, res, next) => {
        console.log("Informações de log")
        next()
    }   
}

module.exports = logger;