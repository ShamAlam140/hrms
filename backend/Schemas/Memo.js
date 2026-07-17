const mongoose = require("mongoose");

const memoTitleSchema = new mongoose.Schema({
  memoTitle: {
    type: String,
    required: true,
  },
  sentFrom: {
    type: String,
    required: true,
  },
  sentTo: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: false,
  },
  generatedDate: {
    type: String,
    default: Date.now,
  },
  memoType: {
    type: String,
    required: true,
  },
  addAttachment: {
    type: String,
    required:false
    // enum: ["Image", "Document", "PDF", "Other"],
  },
  amount: {
    type: Number,
    required : false,
  },
  subject: {
    type: String,
    required: false,
  },
  memoBody:{
    type:String,
    required:false
  },
  status:{
type:String,
default:'Pending',
required:false
  }
});

const MemoTitle = mongoose.model("MemoTitle", memoTitleSchema);

module.exports = MemoTitle;
