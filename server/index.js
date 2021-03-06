const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes");

const app = express()
require("dotenv").config()

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

app.use("/api/auth", userRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server iniciou na porta ${process.env.PORT}`)
);