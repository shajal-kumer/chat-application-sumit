// external imports
const bcrypt = require("bcrypt");
const fs = require("fs");

// internal imports
const User = require("../model/People");

// get user page
async function getUsers(req, res, next) {
	try {
		const users = await User.find();
		res.render("users", { users });
	} catch (error) {
		// res.render("error");
		next(error);
	}
}

// add user
async function addUser(req, res, next) {
	let newUser;
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	if (req.files && req.files.length > 0) {
		newUser = new User({
			...req.body,
			avatar: req.files[0].filename,
			password: hashedPassword,
		});
	} else {
		newUser = new User({
			...req.body,
			password: hashedPassword,
		});
	}

	// save user or send error
	try {
		const result = await newUser.save();
		res.status(200).json({
			message: "User was added successfully!",
		});
	} catch (error) {
		res.status(500).json({
			errors: {
				common: {
					msg: "Unknown error occured!",
				},
			},
		});
	}
}

// delete user
async function deleteUser(req, res) {
	const id = req.params.id;
	try {
		const user = await User.findByIdAndDelete({ _id: id });

		// remove the avatar
		if (user.avatar) {
			fs.unlink(path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`), (err) => {
				if (err) console.log(err);
			});
		}
		res.status(200).json({
			message: "User was Deleted successfully!",
		});
	} catch (error) {
		res.status(500).json({
			errors: {
				common: {
					msg: "Unknown error occured!",
				},
			},
		});
	}
}

module.exports = {
	getUsers,
	addUser,
	deleteUser,
};
