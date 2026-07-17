const departmentSchema = require('../Schemas/department')
const Employee = require('../Schemas/employee')
const EmpRequest= require('../Schemas/employeeRequest')
exports.createDeparment= async (req, res) => {
    try {

      const { name } = req.body;
  
      const newDepartment = new departmentSchema({ name });
  
      await newDepartment.save();
  
      res.status(201).json({ message: 'Department created successfully', department: newDepartment });
    } catch (error) {
      console.error('Error creating department:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.enrollEmployee= async(req, res)=>{
    try {
        const { departmentId } = req.params;
        const { employeeId } = req.body;
    
        const department = await departmentSchema.findById(departmentId);
        if (!department) {
          return res.status(404).json({ error: 'Department not found' });
        }
    
        const employee = await Employee.findById(employeeId);
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
        }
    
        department.employees.push(employee);
    
        await department.save();
        await Employee.findOneAndUpdate(
            { _id: employeeId },
            { $set: { department: departmentId } },
            { new: true }
          );
    
        res.status(200).json({ message: 'Employee added to department successfully', department });
      } catch (error) {
        console.error('Error adding employee to department:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  }

  exports.enrollFormEmployee= async(req, res)=>{
    try {
        const { departmentId } = req.params;
        const { employeeId } = req.body;
    
        const department = await departmentSchema.findById(departmentId);
        if (!department) {
          return res.status(404).json({ error: 'Department not found' });
        }
    
        const employee = await Employee.findById(employeeId);
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
        }
    
        department.employees.push(employee);
    
        await department.save();
        await Employee.findOneAndUpdate(
            { _id: employeeId },
            { $set: { department: departmentId } },
            { new: true }
          );
    
        res.status(200).json({ message: 'Employee added to department successfully', department });
      } catch (error) {
        console.error('Error adding employee to department:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  }


  exports.getSingleDeparment=async(req, res)=>{
    try {
        const { departmentId } = req.params;
    
        const department = await departmentSchema.findById(departmentId).populate('employees');
        if (!department) {
          return res.status(404).json({ error: 'Department not found' });
        }
    
        res.status(200).json({ department });
      } catch (error) {
        console.error('Error fetching department:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  }

  exports.AllDeparment= async(req, res)=>{
    try {
        const departments = await departmentSchema.find().populate("employees")
        // 
        res.status(200).json({ departments });
      } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  } 


  exports.DeleteDepartment= async(req,res)=>{
    try {
      const deletedDepartment = await departmentSchema.findByIdAndDelete(req.params.id);
  
      if (!deletedDepartment) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
      console.error('Error deleting department:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }