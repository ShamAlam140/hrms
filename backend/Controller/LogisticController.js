const Logistic = require("../Schemas/logistic");

exports.getAllLogistic = async (req, res) => {
  try {
    const stats = await Logistic.find();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createLogistic = async (req, res) => {
  try {

    const newStats = new Logistic(req.body);
    const savedStats = await newStats.save();
    res.status(201).json(savedStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.approveLogistic = async (req, res) => {
  try {
    const { id } = req.params;
    // const updateData = req.body;
    const updatedStats = await Logistic.findByIdAndUpdate(
      id,
      {$set:{status: 'Approved'} , reject_reason:"" }
    );
    res.json(updatedStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.rejectLogistic = async (req, res) => {
  try {
    const { id } = req.params;
    // const updateData = req.body;
    const updatedStats = await Logistic.findByIdAndUpdate(
      id,
      {$set:{status: 'Rejected', reject_reason:req.body.reject_reason} }
    );
    res.json(updatedStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteLogistic = async (req, res) => {
  try {
    const { id } = req.params;
    await Logistic.findByIdAndDelete(id);
    res.json({ message: "Dashboard stats deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.logisticSummary= async(req,res)=>{
  try {
    // Calculate total amount
    const totalAmountResult = await Logistic.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: { $toInt: '$amount' } }
            }
        }
    ]);

    const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;

    // Count records with pending and approved statuses
    const statusCounts = await Logistic.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    let pendingCount = 0;
    let approvedCount = 0;

    statusCounts.forEach(({ _id, count }) => {
        if (_id === 'Pending') {
            pendingCount = count;
        } else if (_id === 'Approved') {
            approvedCount = count;
        }
    });
    const totalRequestsCount = await Logistic.countDocuments();
    res.json({
        totalAmount,
        pendingCount,
        approvedCount,
        totalRequestsCount
    });
} catch (error) {
    console.error('Error calculating logistics summary:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}