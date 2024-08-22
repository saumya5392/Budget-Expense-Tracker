const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");
const {
  addTransection,
  getAllTransection,
  editTransection,
  deleteTransection,
} = require("../controllers/transectionctrl");
//const usrs = require('../models/usrs');
const { signUp, login, getUser, getUserDetails } = require("../controllers/users");
const router = require("express").Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes/:user_id", getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses/:user_id", getExpense)
  .delete("/delete-expense/:id", deleteExpense)
  .post("/signup", signUp)
  .post("/login", login)
  .get("/getuser", getUser)
  .post("/userDetails", getUserDetails);

//add transection POST MEthod
router.post("/add-transection", addTransection);
//Edit transection POST MEthod
router.post("/edit-transection", editTransection);
//Delete transection POST MEthod
router.post("/delete-transection", deleteTransection);

//get transections
//router.post("/get-transection", getAllTransection);
router.post("/get-transection", getAllTransection);

module.exports = router;
