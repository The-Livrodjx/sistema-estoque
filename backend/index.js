require('dotenv/config');
const express = require("express")
const connection = require("./database/database")
const cors = require("cors")
const app = express()

const PORT = process.env.PORT || 3000
const routes = require("./routes.js")

const Produto = require("./models/Produto")
const Admin = require("./models/Admin")
const MoneyManager = require("./models/MoneyManager")

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors())
app.use(routes)

connection.authenticate().then(() => {
    console.log("Succesfully connected to DB")
}).catch(err => {

    console.log(err)
})

app.get("/", (req, res) => {

    res.json({msg: "Hello World"})
})

app.listen(PORT, () => console.log("Server running at port: " + PORT))