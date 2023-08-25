const express = require("express");
const appRouter = express.Router();
const NewsController = require("../controllers/NewsController");
const UserController = require("../controllers/UserController");
const  auth = require("../middleware/auth");
appRouter.get("/",NewsController.fetchDataFromDB);
appRouter.post("/",NewsController.fetchDataFromDB);
appRouter.get("/search/:search",NewsController.fetchSearchFilter);

appRouter.get("/sources",NewsController.fetchSourceFromDB);
appRouter.post("/signup",UserController.signupUser);


appRouter.get("/logout",UserController.getLogout);
// AppRouter.get("/logoutfromalldevice",auth,UserContoller.getLogoutFromAllDevice);

appRouter.post("/login",UserController.checkLogin);
module.exports = appRouter;
