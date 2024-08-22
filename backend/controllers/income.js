const IncomeSchema= require("../models/IncomeModel")


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date, user_id,type}  = req.body
    console.log("req.body", req.body);
    const income = IncomeSchema({
        user_id,
        title,
        amount,
        type,
        category,
        description,
        date
    });

    try {
        //validations
        if(!title || !category || !description || !date || !user_id){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income);
}

// exports.getIncomes = async (req, res) =>{
//    // const user_Id = req.params.user_id;
//     try {
//         const incomes = await IncomeSchema.find().sort({createdAt: -1})
//         res.status(200).json(incomes)
//     } catch (error) {
//         res.status(500).json({message: 'Server Error'})
//     }
// }

//new code
exports.getIncomes = async (req, res) => {
    const user_Id = req.params.user_id;

    try {
        const incomes = await IncomeSchema.find({ user_id: user_Id });

        // Send response only once, after retrieving expenses
        res.json(incomes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}