const Budget = require("../Schemas/budgetModel");

exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createBudget = async (req, res) => {
  try {
  
    const newBudget = new Budget(req.body);
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedBudget = await Budget.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    res.json(updatedBudget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    await Budget.findByIdAndDelete(id);
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.budgetSummary=async(req, res)=>{
  try {
    // Calculate total budget
    const totalBudgetResult = await Budget.aggregate([
        {
            $group: {
                _id: null,
                totalBudget: { $sum: '$budgetedAmount' }
            }
        }
    ]);

    const totalBudget = totalBudgetResult.length > 0 ? totalBudgetResult[0].totalBudget : 0;

    // Calculate total amount used
    const totalAmountUsedResult = await Budget.aggregate([
        {
            $group: {
                _id: null,
                totalAmountUsed: { $sum: '$actualAmount' }
            }
        }
    ]);

    const totalAmountUsed = totalAmountUsedResult.length > 0 ? totalAmountUsedResult[0].totalAmountUsed : 0;

    // Calculate total balance
    const totalBalance = totalBudget - totalAmountUsed;

    // Calculate variance percentage
    const variancePercentage = Math.floor(((totalBudget - totalBalance) / totalBudget) * 100);
    res.json({
        totalBudget,
        totalAmountUsed,
        totalBalance,
        variancePercentage
    });
} catch (error) {
    console.error('Error calculating budget summary:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
