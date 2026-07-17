const mongoose = require("mongoose");

const LogisticSchemas= new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      purpose: {
        type: String,
        required: true,
      },
      sentTo: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: false,
      },
      requestBy: {
        type: String,
        required: false,
      },
      sentTo: {
        type: String,
        required: false,
      },
      generatedDate: {
        type: String,
        default: Date.now,
      },
      status: {
        type: String,
       default:'Pending'
      },
      reject_reason:{
        type: String, 
        required:false
      },

   
}
,
{timestamps:true}
);

const LogisticSchema = mongoose.model("Logistics", LogisticSchemas);

module.exports = LogisticSchema;
