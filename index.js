const path = require("path")
const express = require("express")
const expressEdge = require("express-edge")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const Post = require('./database/models/Post')
const app = new express()

app.use(express.static("public"))
app.use(expressEdge.engine)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload())

mongoose.connect("mongodb://localhost/node-js-blog")


const validateCreatePostMiddleware = (req, res, next) => {
    if(!req.files.image || !req.body.title || !req.body.subtitle || !req.body.content || !req.body.username) {
        return res.redirect('/posts/new')
    }
    next()
}

app.use('/posts/store', validateCreatePostMiddleware)

app.set('views', `${__dirname}/views`)

app.get("/", async (req, res) => {
    const posts = await Post.find({})
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
    const {image} = req.files
    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/')
        })
    })
})

app.listen(3000, () => {
    console.log("App listening to port 3000")
})