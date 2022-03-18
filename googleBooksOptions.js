const googleBooksOptions = {
    key: process.env.GOOGLE_BOOKSAPIKEY,
    field: 'title',
    offset: 0,
    limit: 10,
    type: 'books',
    order: 'relevance',
    lang: 'en'
}
module.exports = googleBooksOptions


// module exports items as default ===> const item = require(PATH)