const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String },
	role: { type: String, enum: ["admin", "buyer", "seller"], required: true },
	provider: { type: String, enum: ["google", "local"] },
});

module.exports = mongoose.model("User", UserSchema);
