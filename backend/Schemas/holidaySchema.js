const mongoose = require('mongoose');

const HolidaySchema = new mongoose.Schema({
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    day: { type: Number, required: true },
    holidayName:{ type:String , required:true}
});

const Holiday = mongoose.model('Holiday', HolidaySchema);


module.exports = Holiday;