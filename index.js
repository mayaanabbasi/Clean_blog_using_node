const path = require("path")
const express = require("express")
const expressEdge = require("express-edge")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

const Post = require('./database/models/Post')
const app = new express()

app.use(express.static("public"))
app.use(expressEdge.engine)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect("mongodb://localhost/node-js-blog")

app.set('views', `${__dirname}/views`)

app.get("/", async (req, res) => {
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts
    })
})

app.get("/about", (req, res) => {
    res.render('about')
})

app.get("/contact", (req, res) => {
    res.render('contact')
})

app.get("/post/:id", async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
})

app.get("/posts/new", (req, res) => {
    res.render('create')
})

app.post("/posts/store", (req, res) => {
    Post.create(req.body, (error, post) => {
        res.redirect('/')
    })
})

app.listen(3000, () => {
    console.log("App listening to port 3000")
})