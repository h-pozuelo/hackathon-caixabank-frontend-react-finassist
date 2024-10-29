import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { CircularProgress, Typography, Box } from "@mui/material";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    console.log(error);
    return <Typography color="error">{error}</Typography>;
  }

  const expenses = transactions.filter((tran) => tran.type === "expense");

  const calculateExpenses = (month) => {
    let filteredExpenses = expenses.filter(
      (exp) => new Date(exp.date).getMonth() === month
    );
    return filteredExpenses.reduce(
      (accumulator, current) => accumulator + current.amount,
      0
    );
  };

  let currentMonth = new Date().getMonth();
  const expenseThisMonth = calculateExpenses(currentMonth);
  const expenseLastMonth = calculateExpenses(
    currentMonth === 0 ? 11 : currentMonth - 1
  );

  let remain = expenseThisMonth - expenseLastMonth;

  const message =
    !expenseLastMonth || expenseLastMonth === 0
      ? "You must keep spending!"
      : expenseThisMonth === expenseLastMonth
      ? "Your spending hasn't changed."
      : `Your expenses has ${remain > 0 ? "increased" : "decreased"} ${(
          (Math.abs(remain) * 100) /
          expenseLastMonth
        ).toFixed(2)}%`;

  return (
    <Box>
      <Typography variant="h5">Recommendations</Typography>
      <Typography>{message}</Typography>
    </Box>
  );
}

export default Recommendations;
