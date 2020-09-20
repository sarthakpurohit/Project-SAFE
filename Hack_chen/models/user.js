var mongoose    = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
	fullname: String,
	address : String,
	phonenumber: String,
	alternatephonenumber: String,
	sdo:String,
	car_company:String,
	car_model:String,
	car_number_plate:String,
	username: String,
	password: String,
	auth: String
	
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);