var express = require("express");
var router  = express.Router();
var bodyParser =require("body-parser");
var bodyParser =require("body-parser");


router.get("/secretx",function(req,res){
	res.render("secretx");
});



//==============================================//


router.get("/adminlog",function(req,res){
	res.render("adminlogin");
});

router.post("/adminlog",function(req,res){
	if(req.body.username=="shubhamanandalaya@gmail.com" || req.body.username=="sarthakpurohit@gmail.com" || req.body.username=="devangipurkayastha@gmail.com" || req.body.username=="ritvick.v.pandey50@gmail.com" ){
		res.redirect("/secretx");
	}
	else{
		res.redirect("/login");
	}
});

//=============================================//

router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

module.exports = router;