const Project = require('../Schemas/projectSchema')
const EmployeeSchemas = require('../Schemas/employee')

exports.createProject = async (req, res) => {
    try {
        const { projectName, projectTitle, description, duration, manager } = req.body;
        if (!manager) {
            return res.status(400).json({ error: 'Manager ID is required' });
        }
        const managerExists = await EmployeeSchemas.findById(manager);
        if (!managerExists) {
            return res.status(404).json({ error: 'Manager not found' });
        }

        const project = new Project({
            projectName,
            projectTitle,
            description,
            duration,
            // tickets,
            // teamAssign, 
            manager: manager
        });

        
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getProjects = async (req, res) => {
    try {
      const projects = await Project.find().populate('manager');
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  exports.getProjectById = async (req, res) => {
    try {
      const projectId = req.params.projectId;
      const project = await Project.findById(projectId).populate('manager');
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.assignEmployeeToProjectTeam = async (req, res) => {
    try {
      const { projectId, employeeId } = req.body;
  
    
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Check if the employee is already in the project team
      if (project.teamAssign && project.teamAssign.includes(employeeId)) {
        return res.status(400).json({ error: 'Employee is already in the project team' });
      }
  
      // Append the new employee to the project team
      if (!project.teamAssign) {
        project.teamAssign = [employeeId];
      } else {
        project.teamAssign.push(employeeId);
      }
      const updatedProject = await project.save();
      const updatesemp= await EmployeeSchemas.findOneAndUpdate(
        { _id: employeeId },
        // { $set: { project: projectId     
        // } },
        { $push: { project: projectId } }, 
        { new: true }
      );

      


  
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error('Error assigning employee to project team:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  exports.getProjectsByManager = async (req, res) => {
    try {
        const { managerId } = req.params;

        const projects = await Project.find({ manager: managerId }).populate('manager').populate('teamAssign');

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects by manager:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.changeProjectStatus = async (req, res) => {
  try {
      const { projectId } = req.params;
      const { status } = req.body;
      
      // Find the project by ID
      const project = await Project.findById(projectId);
      if (!project) {
          return res.status(404).json({ error: 'Project not found' });
      }

      // Update the project status
      project.projectStatus = status;
      const updatedProject = await project.save();

      res.status(200).json(updatedProject);
  } catch (error) {
      console.error('Error changing project status:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getProjectsOfEmployee = async (req, res) => {
  try {
      const { employeeId } = req.params;

      const projects = await Project.find({ teamAssign: employeeId }).populate('manager');

      res.json(projects);
  } catch (error) {
      console.error('Error fetching projects by employee:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};