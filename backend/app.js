const express = require("express");
const session = require('express-session');
const passport = require('passport');
const app = express();
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file
const mongoconnect = require("./Config");
const DashboardCardsRoute = require("./Routes/DashboardCardsRoute");
const dashboardMemoRoutes=require("./Routes/dashboardMemoRoutes")
const dashboardStaffRoutes = require("./Routes/dashboardStaffRoutes")
const staffRoutes = require("./Routes/staffRoutes")
const memoTitleRoutes = require("./Routes/memoTitleRoutes")
const circularRoutes = require("./Routes/circularRoutes")
const requestRoutes = require("./Routes/requestRoutes")
const LogisticCardsRoute = require("./Routes/LogisticCardsRoute")
const budgetRoutes = require("./Routes/budgetRoutes")
const stockRoutes = require("./Routes/stockRoutes")
const capacityBuildingRoutes = require("./Routes/capacityBuildingRoutes")
const payrollRoutes = require("./Routes/payrollRoutes")
const procurementRequestRoutes=require("./Routes/procurementRequestRoutes")
const salaryBreakdownRoutes = require("./Routes/salaryBreakdownRoutes")
const taxDefinitionRoutes = require("./Routes/taxDefinitionRoutes")
const paySlipRoutes = require("./Routes/paySlipRoutes")
const paymentRoutes = require("./Routes/paymentRoutes")
const LogisticRoutes = require("./Routes/LogisticsRoute")
const  leaveRoutes=require("./Routes/leaveRoute")
const departmentRoute = require("./Routes/deparmentRoute")
const CsvUploadRoute= require("./Routes/uploadCsvRoute")
const attendanceRoute= require('./Routes/attendanceRoute')
const policyRoute= require('./Routes/policyRoute')
const projectRoute= require('./Routes/projectRoute')
const GoogleAuthRoute= require('./api/auth')
const path = require('path')
const Employee = require("./api/Employee");
const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173'
// app.use(cors()); // to follow cors policy
app.use(
  cors({
    origin: ["https://hrms-d8480.web.app","http://localhost:5173"],
    credentials: true,
  })
);
app.use(xss()); // safety against XSS attack or Cross Site Scripting attacks
app.use(helmet()); // safety against XSS attack
app.use(express.json({ extended: false }));
app.use(express.static(path.resolve(__dirname,'public')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const port = process.env.PORT || 5000;


app.use(session({
  secret: 'dhfsjfljsdfljks35353', // Change this to a secure secret for production
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session()); 
try {
  mongoconnect
    .connectToDatabase()
    .then(() => {
      app.listen(port, () => {});
    })
    .catch((err) => {
      
    });
} catch (err) {
  
}

// Use DashboardCardsRoute with the '/dashboard' prefix
app.use("/dashboardcards", DashboardCardsRoute);

app.use("/dashboardmemos", dashboardMemoRoutes);

app.use("/dashboardstaf", dashboardStaffRoutes);

app.use("/staff", staffRoutes);

app.use("/memo", memoTitleRoutes);

app.use("/circulars", circularRoutes);
app.use("/request", requestRoutes);
app.use("/LogisticCards", LogisticCardsRoute);
app.use("/Logistic",LogisticRoutes );
app.use("/budget", budgetRoutes);
app.use("/policy", policyRoute)
app.use("/projects", projectRoute)
app.use("/stocks", stockRoutes);
app.use("/capacitybuilding", capacityBuildingRoutes);

app.use("/procurement", procurementRequestRoutes);
app.use("/upload", CsvUploadRoute) 
app.use("/attendance", attendanceRoute)
app.use('/api/user',require('./api/Employee'));
app.use('/auth', GoogleAuthRoute)
app.use('/api/uploads',require('./api/auth'));
app.use("/payroll", payrollRoutes);
app.use("/salarybreakdowns", salaryBreakdownRoutes);
app.use("/taxdefinitions", taxDefinitionRoutes);
app.use("/payslips", paySlipRoutes);
app.use("/paymenthistory", paymentRoutes);
app.use('/api/leave',leaveRoutes );
app.use('/department', departmentRoute)
app.use("/getuser", Employee);
app.get("/", (req, res) => {
  // 
  res.json("working");
});
