const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
require("dotenv").confg()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado ao banco!")
}).catch((err) => {
    console.log(err.message)
})

const sever = app.listen(process.env.PORT, ( => {
    console.log(`Servidor Iniciou na Porta ${proces.env.PORT}!`)
}))