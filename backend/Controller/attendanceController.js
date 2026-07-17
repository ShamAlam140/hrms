const Attendance = require('../Schemas/attendanceSchema');
const EmployeeSchemas = require('../Schemas/employee');
const HolidaySchema= require('../Schemas/holidaySchema')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getAllattendance = async (req, res) => {
    try {
        // Retrieve all attendance records
        const attendance = await Attendance.find().populate('employee');
        attendance.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        res.json(attendance);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// exports.MarkAttendance = async (req, res) => {
//     try {
//         const { employeeId, action } = req.body;
        
//         const employee = await EmployeeSchemas.findById(employeeId);
//         if (!employee) {
//             return res.status(404).json({ error: 'Employee not found' });
//         }
        
//         // const today = new Date().toLocaleDateString('en-GB');
//         // 
//         const today = new Date()
//         const isoDateString = today.toISOString();
//         // const formatteddate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        
//         const currentTime = new Date().toLocaleTimeString([], { hour12: true });
//         let attendance = await Attendance.findOne({ employee: employeeId, date: isoDateString });
       
//         if (!attendance) {
//             // If no attendance record exists for today, create a new one
//             attendance = new Attendance({
//                 employee: employeeId,
//                 date: isoDateString
//             });
//         }
        
//         if (action === 'punchIn') {
//             if (attendance.punchIn) {
//                 return res.status(200).json({ error: 'Already punched in' });
//             }
//             attendance.punchIn = currentTime;
//             attendance.status = "Present";
//         } else if (action === 'punchOut') {
//             if (!attendance.punchIn) {
//                 return res.status(400).json({ error: 'Cannot punch out without punching in' });
//             }
//             attendance.punchOut = currentTime;
//         } else {
//             return res.status(400).json({ error: 'Invalid action' });
//         }
        
//         // Save the updated attendance record
//         await attendance.save();
        
//         res.status(200).json({ message: 'Attendance marked successfully' });
//     } catch (error) {
//         console.error('Error marking attendance:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }


exports.MarkAttendance = async (req, res) => {
    try {
        const { employeeId, action } = req.body;
        
        const employee = await EmployeeSchemas.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        
        const today = new Date(); // Get current date and time
        const currentTime = today.toLocaleTimeString([], { hour12: false });
        
        let attendance = await Attendance.findOne({ employee: employeeId, date: { $gte: today.setHours(0, 0, 0, 0) } });
       
        if (!attendance) {
            // If no attendance record exists for today, create a new one
            attendance = new Attendance({
                employee: employeeId,
                date: today // Store the current date directly
            });
        }
        
        if (action === 'punchIn') {
            if (attendance.punchIn) {
                return res.status(200).json({ error: 'Already punched in' });
            }
            attendance.punchIn = currentTime;
            attendance.status = "Present";
        } else if (action === 'punchOut') {
            if (!attendance.punchIn) {
                return res.status(400).json({ error: 'Cannot punch out without punching in' });
            }
            attendance.punchOut = currentTime;
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }
        
        // Save the updated attendance record
        await attendance.save();
        
        res.status(200).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.MonthwiseAttendance=async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { year, month } = req.query;
        const startDate = new Date(year, month - 1, 1); // First day of the month
        const endDate = new Date(year, month, 0); // Last day of the month

        const startDateString = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
        const endDateString = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;

        
        

        const attendance = await Attendance.find({
            employee: employeeId,
            date: { $gte: startDate, $lte: endDate, }
        });
  
     
       
        


      
        const totalDaysInMonth = endDate.getDate();
        // 
        // Calculate total days attended
        const totalDaysAttended = attendance.filter(day => day.status === 'Present').length;

        // Calculate total days absent
        const totalDaysAbsent = totalDaysInMonth - totalDaysAttended;

        // Calculate attendance percentage
        const attendancePercentage = (totalDaysAttended / totalDaysInMonth) * 100;
      
        const noofHolidays= await getNumberOfHolidays(month, year);
        const totalWorkingDays = totalDaysInMonth - noofHolidays
            
        res.status(200).json({ 
            totalDaysAttended,
            totalDaysAbsent,
            totalDaysInMonth,
            attendancePercentage,
            totalWorkingDays
        });
    } catch (error) {
        console.error('Error fetching month-wise attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function getNumberOfHolidays(month, year) {
    try {

        
        // Query holidays from the database for the given month and year
        const holidays = await HolidaySchema.find({ month, year });
    //   
        // Filter out holidays falling on weekends (Saturday and Sunday)
        const workingDayHolidays = holidays.filter(holiday => {
            const holidayDate = new Date(year, month, holiday.day);
            const dayOfWeek = holidayDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
            return dayOfWeek !== 0 && dayOfWeek !== 6; // Exclude weekends
        });

        // Return the count of working day holidays
        return workingDayHolidays.length;
    } catch (error) {
        console.error('Error fetching holidays:', error);
        throw error;
    }
}

exports.getAttendanceByEmployeeId = async (req, res) => {
    try {
      const { employeeId } = req.params;
  
      const attendance = await Attendance.find({ employee: employeeId }).populate('employee');
      attendance.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      res.status(200).json(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };