const express= require("express");

const {getuser,postuser,login}= require("../controller/controller");
const router = express.Router();

router.get("/getuser",getuser);

router.post("/postuser",postuser);

router.post("/login",login);
module.exports=router;