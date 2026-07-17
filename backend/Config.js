const express_ = require("express");
const app = express_();
const bodyparser = require("body-parser");
const helmet = require("helmet");
var cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoose = require("mongoose");
require("dotenv").config();

// const uri = 'mongodb+srv://susalabs:susalabs@cluster0.xn0yck9.mongodb.net/?retryWrites=true&w=majority';
const uri =
  "mongodb+srv://complaintwork2:susaweb@cluster0.fb6mawe.mongodb.net/HRMS?retryWrites=true&w=majority&appName=Cluster0";

exports.connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    
  } catch (error) {
    
    process.exit(1);
  }
};
// connectToDatabase();
