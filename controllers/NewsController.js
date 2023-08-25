// import News from "../models/News.js";
// import fetch from "node-fetch";
const News = require("../models/News");
const NewsController = {
    fetchDataFromNewsApi: async (req, res) => {
        // try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}`);
        // const response = await fetch("http://localhost:8080/articles");
        const result = await response.json();
        const data = result.articles;
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            const news = await News.create({
                source: {
                    id: data[i].source.id,
                    name: data[i].source.name
                },
                author: data[i].author,
                title: data[i].title,
                description: data[i].description,
                url: data[i].url,
                urlToImage: data[i].urlToImage,
                publishedAt: data[i].publishedAt,
                content: data[i].content

            })
        }

    },
    fetchDataFromDB: async (req, res) => {
        // console.log("req body",req.body);
        let filters = {};
        if (req.body) {
            const sources = req.body.sourceLists;
            if (sources !== undefined) {
                filters = { "source.name": { $in: sources } };

            }

        }
        try {
            const articles = await News.find(filters);
            res.status(200).json({
                status: "ok",
                totalResults: articles.length,
                articles,
            type:"filter"
            });
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },
    fetchSourceFromDB: async (req, res) => {
        try {
            const sources = await News.find({});
            // console.log("sources",sources);
            res.status(200).json({
                status: "ok",
                totalResults: sources.length,
                sources,
                type:"source"

            });
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },
    fetchSearchFilter:async(req,res)=>{
        try{
            const articles = await News.find({
                "$or":[
                    {author:{'$regex' : req.params.search, '$options' : 'i'}},
                    {title:{'$regex' : req.params.search, '$options' : 'i'}},
                    {description:{'$regex' : req.params.search, '$options' : 'i'}},
                    {content:{'$regex' : req.params.search, '$options' : 'i'}}



                ]
            })
            res.status(200).json({
                status: "ok",
                totalResults: articles.length,
                articles,
                type:"search"

            });
        }catch(error){
            console.log(error);
            res.status(400).json(error);
        }
    }


}

module.exports = NewsController;