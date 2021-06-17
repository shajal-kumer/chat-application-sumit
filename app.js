// External import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const formData = require("express-form-data");

// internal import
const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

const app = express();

// parse process.env
dotenv.config();

// database connection
mongoose
	.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Database connection successful!"))
	.catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookieParser
app.use(cookieParser(process.env.COOKIE_SECRET));

// route setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

//  404 not found handler
app.use(notFoundHandler);

// default error hadnler
app.use(errorHandler);

// app listening
app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`));
