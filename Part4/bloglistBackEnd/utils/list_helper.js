const _ = require('lodash');
const blog = require('../models/blog');

const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (total, blog) => {
        return total + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, blog) => {
        return blog.likes > max.likes ? blog : max
    }
    const max_blog = blogs.reduce(reducer, blogs[0])
    return {
        "title": max_blog.title,
        "author": max_blog.author,
        "likes": max_blog.likes
    }
}

const mostBlogs = (blogs) => {
    const grouped_author = _.groupBy(blogs, 'author')

    const new_obj = (value, key) => { return { "author": key, "blogs": value.length } }

    const toCount = _.map(grouped_author, new_obj)

    const reducer = (max, blog) => (max.blogs > blog.blogs ? max : blog)

    return toCount.reduce(reducer, toCount[0]);
}


const mostLiked = (blogs) => {
    const grouped_author = _.groupBy(blogs, 'author')

    const new_obj = (value, key) => {
        const total_likes = totalLikes(value)
        return { "author": key, "likes": total_likes }
    }

    const toCount = _.map(grouped_author, new_obj)

    const reducer = (max, blog) => (max.likes > blog.likes ? max : blog)

    return toCount.reduce(reducer, toCount[0]);

}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLiked
}


