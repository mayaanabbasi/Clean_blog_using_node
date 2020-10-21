const path = require("path")
const express = require("express")
const expressEdge = require("express-edge")
const mongoose = require("mongoose")
const app = new express()

app.use(express.static("public"))
app.use(expressEdge.engine)

mongoose.connect("mongodb://localhost/node-js-blog")

app.set('views', `${__dirname}/views`)

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/about", (req, res) => {
    res.render('about')
})

app.get("/contact", (req, res) => {
    res.render('contact')
})

app.get("/post", (req, res) => {
    res.render('post')
})

app.listen(3000, () => {
    console.log("App listening to port 3000")
})