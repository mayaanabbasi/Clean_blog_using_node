const express = require("express")
const expressEdge = require("express-edge")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const storePostMiddleware = require("./middleware/storePost");
const app = new express()

app.use(express.static("public"))
app.use(expressEdge.engine)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload())

mongoose.connect("mongodb://localhost/node-js-blog")

app.use('/posts/store', storePostMiddleware)


app.set('views', `${__dirname}/views`)


app.get("/about", (req, res) => {
    res.render('about')
})
app.get("/contact", (req, res) => {
    res.render('contact')
})


app.get("/", homePageController)
app.get("/post/:id", getPostController)
app.get("/posts/new", createPostController)
app.post("/posts/store", storePostController)

app.listen(3000, () => {
    console.log("App listening to port 3000")
})