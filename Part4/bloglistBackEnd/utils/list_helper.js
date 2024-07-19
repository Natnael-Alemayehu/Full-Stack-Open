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



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}


