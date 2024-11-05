import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { Paper, Typography } from "@mui/material";

function Statistics() {
  const transactions = useStore(transactionsStore);

  const expenses = transactions.filter((tran) => tran.type === "expense");

  const totalExpense = expenses.reduce(
    (accumulator, current) => accumulator + current.amount,
    0
  );

  const uniqueDates = [...new Set(expenses.map((exp) => exp.date))];

  const averageDailyExpense = totalExpense / uniqueDates.length;

  const categoryExpenses = expenses.reduce((accumulator, current) => {
    if (!accumulator[current.category]) accumulator[current.category] = 0;
    accumulator[current.category] += current.amount;
    return accumulator;
  }, {});

  let maxCategory = Object.keys(categoryExpenses).length === 0 ? null : Object.entries(categoryExpenses).sort(
    ([aKey, aValue], [bKey, bValue]) => aValue < bValue
  )[0][0];

  return (
    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6">Key Statistics</Typography>
      <Typography>
        Average Daily Expense: {isNaN(averageDailyExpense) ? "0" : averageDailyExpense.toFixed(2)} €
      </Typography>
      <Typography>
        Highest Spending Category:{" "}
        {maxCategory
          ? `${maxCategory} (${categoryExpenses[maxCategory].toFixed(2)} €)`
          : "No data available"}
      </Typography>
    </Paper>
  );
}

export default Statistics;
