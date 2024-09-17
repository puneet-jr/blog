const express= require("express");

const blogrouter= express.Router();

const {getblogs,postblog,updateblog,getblogbyid,deleteblog,getblogbyuser}= require("../controller/blogcontroller");

blogrouter.get("/getblog",getblogs);

blogrouter.post("/postblog",postblog);

blogrouter.put("/updateblog/:id",updateblog);

blogrouter.get("/getblogbyid/:id",getblogbyid);

blogrouter.delete("/deleteblog/:id",deleteblog);

blogrouter.get("/getblogbyuser/:id",getblogbyuser);
module.exports= blogrouter;