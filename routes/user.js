var express = require("express");
var router  = express.Router();
var passport= require("passport");
var bodyParser            =require("body-parser");
var LocalStrategy         = require("passport-local");
var	passportLocalMongoose = require("passport-local-mongoose");
var alert                 = require("alert");
var User = require("../models/user");

router.use(passport.initialize());
router.use(passport.session());
router.use(bodyParser.urlencoded({extended:true}));

passport.use('local.one',new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/secret",UserisLoggedIn,function(req,res){
	res.render("secret",{currentUser: req.user});
});



//==============REGISTER======================//

// router.get("/register",function(req,res){
// 	res.render("register");
// });

router.post("/register",function(req,res){
	
	User.register(new User({username: req.body.username ,fullname: req.body.fullname ,address:req.body.address,phonenumber:req.body.phonenumber, alternatephonenumber:req.body.alternatephonenumber,sdo:req.body.sdo,car_company:req.body.car_company,car_model:req.body.car_model ,car_number_plate:req.body.car_number_plate,auth:"False"}), req.body.password, function(err,user){
		
		if(err){
		   console.log(err);
		return res.render("register");
		   }
		passport.authenticate("local.one")(req,res,function(){
			console.log(req.body.username);
			res.redirect("/secret");
		})
	})
});

//=====================Login=====================//

router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local.one",{
	successRedirect: "/secret",
	failureRedirect: "/login"
}),function(req,res){
	
});

router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

function UserisLoggedIn(req,res,next){
	if(req.isAuthenticated('local.one')){
		return next();
	}
	res.redirect("/login")
}



module.exports = router;