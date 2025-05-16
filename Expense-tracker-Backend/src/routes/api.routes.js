/**
* file which containts all the controllers routes.
*/

const express = require("express");
const authRoutes = require("./auth.routes.js");
const applicationRoutes = require("./application.routes.js")

const app = express();

app.use("/auth/", authRoutes);
app.use("/application/", applicationRoutes);



module.exports = app;