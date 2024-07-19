const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => logger.error(error))
})

blogRouter.post('/', (request, response) => {
    const newBlog = request.body
    console.log(newBlog);

    const blog = new Blog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes
    })

    blog.save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogRouter