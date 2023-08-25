const express = require("express");
const cors  = require("cors");
const app = express();
const conn = require("./dbconnect/conn");
const cookieParser = require("cookie-parser");
const bcrypt  = require("bcryptjs")
const appRouter = require("./routes/news");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use("/news/api",appRouter);
require('dotenv').config()
 const NewsController = require("./controllers/NewsController");
 

// NewsController.fetchDataFromNewsApi();
var cron = require('node-cron');
cron.schedule('0 0 0 * * *', () => {
    NewsController.fetchDataFromNewsApi();

    console.log('running a task at every 24 hour');
  });
app.listen(4000, () => {
    console.log("Listening on port 4000");
});