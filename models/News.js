
const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
   source:{
    type:Object
   },
   author:{
    type:String
   },
   title:{
    type:String
   },
   description:{
    type:String
   },
   url:{
    type:String
   },
   urlToImage:{
    type:String
   },
   publishedAt:{
    type:String
   },
   content:{
    type:String
   }


})

const   News = mongoose.model("article",articleSchema);
module.exports =  News;