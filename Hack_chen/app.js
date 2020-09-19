var express               = require("express"),
	mongoose              = require("mongoose"),
	passport              = require("passport"),
	bodyParser            =require("body-parser"),
	LocalStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User                  = require("./models/user")

mongoose.connect('mongodb://localhost:27017/hackchennai', {useNewUrlParser: true, useUnifiedTopology: true});

var adminRoutes    = require("./routes/admin");
var userRoutes	   = require("./routes/user");

var app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('css'));


app.use(require("express-session")({
	secret: "Rusty is best",
	resave: false,
	saveUninitialized: false
}));



app.get("/",function(req,res){
	res.render("home");
});

//=============USER========================//
app.use(userRoutes);

//==================ADMIN============================//

app.use(adminRoutes);

app.listen(process.env.PORT || 3000 ,process.env.IP,function(){
	console.log("server started....");
});