import React, { useEffect, useRef } from "react";
import { Progress } from "antd";
import { useGlobalContext } from "../../context/globalContext";
import "./Analytics.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PieChart } from "@mui/x-charts/PieChart";

//for category
const categories = [
  "salary",
  "freelancing",
  "Medical Emergency",
  "investments",
  "part-time job",
  "Teaching",
  "traveling",
  "youtube",
  "Coaching fees",
  "School fees",
  "Bills",
  "Shopping",
  "Loans",
  "other",
];
//for total transaction
const Analytics = () => {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getExpenses, getIncomes]);

  const totalTransection = incomes.length + expenses.length;
  const totalIncomeTransections = incomes;
  const totalExpenseTransections = expenses;
  const totalIncomePercent =
    (totalIncomeTransections.length / totalTransection) * 100;
  const totalExpensePercent =
    (totalExpenseTransections.length / totalTransection) * 100;

  //total turnover
  const totalTurnover =
    incomes.reduce((acc, transaction) => acc + transaction.amount, 0) +
    expenses.reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnover = incomes.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalExpenseTurnover = expenses.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalExpenseTransactionPercent =
    (totalExpenseTurnover / totalIncomeTurnover) * 100;

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;

  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  useEffect(() => {
    if (totalExpenseTransactionPercent > 75) {
      toast.warning(
        "You have spent more than 75 percent of your income. Please be cautious."
      );
    }
  }, [totalExpenseTransactionPercent]);

  return (
    <>
      <ToastContainer />
      <div className="chart-container">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transaction : {totalTransection}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income: {totalIncomeTransections.length}
              </h5>
              <h5 className="text-danger">
                Expense: {totalExpenseTransections.length}
              </h5>
              <div className="income-chart-container">
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: totalIncomePercent.toFixed(0),
                          label: "Income Transactions",
                        },
                        {
                          id: 1,
                          value: totalExpensePercent.toFixed(0),
                          label: "Expense Transactions",
                        },
                      ],
                    },
                  ]}
                  width={600}
                  height={150}
                />
                {/* <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />

                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions : {totalTurnover}
            </div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
              <div className="expense-chart-container">
                {/* <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                /> */}

                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTransactionPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="category-container">
        <div className="col-md-4">
          <h4>Category Income</h4>
          {categories.map((category) => {
            const amount = incomes
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      type="line"
                      strokeColor="green"
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-4">
          <h4>Category Expense</h4>
          {categories.map((category) => {
            const amount = expenses
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      type="line"
                      strokeColor="red"
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
