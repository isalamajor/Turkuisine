const { Schema, model } = require("mongoose");


const ArticleSchema = Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    published_date: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
        default: null
    }
});


module.exports = model("Article", ArticleSchema, "articles"); // La colección será articles