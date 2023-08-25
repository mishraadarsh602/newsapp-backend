
const mongoose = require("mongoose");

   
//  const  conn = mongoose.connect("mongodb://127.0.0.1:27017/newsapp", {
    const  conn = mongoose.connect("mongodb+srv://mishraadarsh602:newsapi@cluster0.oavzqsr.mongodb.net/newsapi?retryWrites=true&w=majority", {
useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
})
.catch(error => {
    console.log(error);
})

module.exports = conn;