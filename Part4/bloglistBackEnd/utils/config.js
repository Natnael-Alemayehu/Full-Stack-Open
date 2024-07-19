require('dotenv').config()

DATABASE_URI = process.env.DATABASE_URI
PORT = process.env.PORT

module.exports = {
    DATABASE_URI,
    PORT
}