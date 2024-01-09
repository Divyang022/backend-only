const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT=4000;
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

mongoose.connect('mongodb+srv://divyangpandoh02:divyang02@cluster0.xuxgikt.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(cors()) // Use this after the variable declaration

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);