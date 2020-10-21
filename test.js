const mongoose = require("mongoose")

const Post = require('./database/models/Post')

mongoose.connect("mongodb://localhost/mode-js-test-blog")

Post.find({}, (error, posts) => {
    console.log(error, posts)
})

// Post.create({
//     title: "My second blog post",
//     desc: "Blog description",
//     content: "Lorem ipsum content"
// }, (error, post) => {
//     console.log(error, post)
// })