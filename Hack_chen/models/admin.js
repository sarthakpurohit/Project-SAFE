var mongoose    = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var adminSchema = new mongoose.Schema({
	image:String	
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", adminSchema);