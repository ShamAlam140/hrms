const mongoose = require("mongoose");

const capacityBuildingSchema = new mongoose.Schema({
  sentFrom: String,
  description: String,
  startDate: Date,
  duration: String,
  trainingType:String,
  mode:String,
  StaffName:String,
  status:{
    type:String,
    default:"Scheduled"
  },
});

const CapacityBuilding = mongoose.model(
  "CapacityBuilding",
  capacityBuildingSchema
);

module.exports = CapacityBuilding;
