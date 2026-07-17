const nodemailer = require("nodemailer");

const asyncHandler = require("express-async-handler");

const sendEmail = async (data) => {
  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.MAIL_PORT, 10) || 587,
    secure: process.env.MAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"HRMS Portal" <${process.env.MAIL_ID}>`, // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.htm, // html body 
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error inside sendEmail helper:", error);
    throw error;
  }
};

module.exports = sendEmail;
