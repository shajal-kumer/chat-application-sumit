// external imports
const express = require("express");
const router = express.Router();
var multiparty = require("multiparty");

// internal import
const { getUsers, addUser, deleteUser } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/userValidator");

// user page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user
router.post("/", avatarUpload, addUserValidators, addUserValidationHandler, addUser);

// delete user
router.delete("/:id", deleteUser);

// module export
module.exports = router;
