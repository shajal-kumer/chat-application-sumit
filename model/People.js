const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema(
	{
		name: { type: String, requied: true, trim: true },
		email: { type: String, requied: true, trim: true, lowercase: true },
		mobile: { type: String, requied: true },
		password: { type: String, requied: true },
		avatar: { type: String },
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{ timestamps: true }
);

const People = mongoose.model("People", peopleSchema);

//Module export
module.exports = People;
