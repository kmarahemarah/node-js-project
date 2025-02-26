const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
tittle : String,
body : String,
NumberOfLikes : Number



})

const Article = mongoose.model("Article"/*the article name in data base*/,articleSchema/*article name*/);
module.exports = Article;