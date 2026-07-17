const ProcurementRequest = require("../Schemas/ProcurementRequest");

// Get all procurement requests
exports.getAll = async (req, res) => {
  try {
    const requests = await ProcurementRequest.find();
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single procurement request by ID
exports.getById = async (req, res) => {
  try {
    const request = await ProcurementRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new procurement request
exports.create = async (req, res) => {
  try {
    
    const newRequest = new ProcurementRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing procurement request
exports.approveRequest = async (req, res) => {
  try {
    const updatedRequest = await ProcurementRequest.findByIdAndUpdate(
      req.params.id,
      {$set:{status: 'Approved'} , reject_reason:"" }
    );
    res.json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const updatedRequest = await ProcurementRequest.findByIdAndUpdate(
      req.params.id,
      {$set:{status: 'Rejected', reject_reason:req.body.reject_reason} }
    );
    res.json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a procurement request by ID
exports.delete = async (req, res) => {
  try {
    await ProcurementRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.Summary=async(req,res)=>{
  try {
    // Total requests made
    const totalRequests = await ProcurementRequest.countDocuments();

    // Total cost
    const totalCostResult = await ProcurementRequest.aggregate([
      {
        $group: {
          _id: null,
          totalCost: { $sum: "$totalPrice" }
        }
      }
    ]);
    const totalCost = totalCostResult.length > 0 ? totalCostResult[0].totalCost : 0;

    // Pending requests
    const pendingRequests = await ProcurementRequest.countDocuments({ status: "Pending" });

    // Approved requests
    const approvedRequests = await ProcurementRequest.countDocuments({ status: "Approved" });

    res.status(200).json({
      totalRequests,
      totalCost,
      pendingRequests,
      approvedRequests
    });
  } catch (error) {
    console.error("Error calculating procurement summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
