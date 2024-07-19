const blogRouter = require('express').Router()
const blogs = require('../models/blogs')
const logger = require('../utils/logger')

blogRouter.get('/', (request, response) => {
    blogs
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => logger.error(error))
})

blogRouter.post('/', (request, response) => {
    const blog = new blogs(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogRouter