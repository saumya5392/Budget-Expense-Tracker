const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, type, category, description, date, user_id } =
        req.body;
    console.log("req.body", req.body);
    const income = ExpenseSchema({
        user_id,
        title,
        amount,
        type,
        category,
        description,
        date,
    });

    try {
        //validations
        if (!title || !category || !description || !date || !type || !user_id) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        if (amount <= 0 || !amount === "number") {
            return res
                .status(400)
                .json({ message: "Amount must be a positive number!" });
        }
        await income.save();
        res.status(200).json({ message: "Expense Added" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

    console.log(income);
};

exports.getExpense = async (req, res) => {
    const user_Id = req.params.user_id;

    try {
        const expenses = await ExpenseSchema.find({ user_id: user_Id });

        // Send response only once, after retrieving expenses
        res.json(expenses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: "Expense Deleted" });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server Error" });
        });
};
