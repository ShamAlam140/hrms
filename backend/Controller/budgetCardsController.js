const BudgetCards = require("../Schemas/budgetCardsSchema");

exports.createBudgetCard = async (req, res) => {
  try {
    const {
      totalAnnualBudget,
      annualBudgetChange,
      amountUsed,
      totalBudgetBalance,
      budgetPercentageUsed,
    } = req.body;

    const newCard = new BudgetCards({
      totalAnnualBudget,
      annualBudgetChange,
      amountUsed,
      totalBudgetBalance,
      budgetPercentageUsed,
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.GetAllBudgetCards = (req, res) => {
    try {

        const BudgetCard = await
        
    } catch (err) {
        
    }
}
// Implement other CRUD operations similarly
