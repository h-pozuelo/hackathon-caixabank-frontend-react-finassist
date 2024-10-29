import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AnalysisGraph() {
  const transactions = useStore(transactionsStore);

  const categories = [...new Set(transactions.map((tran) => tran.category))];

  const data = categories.map((cat) => {
    let filteredTransactions = transactions.filter(
      (tran) => tran.category === cat
    );
    let totalIncome = filteredTransactions
      .filter((tran) => tran.type === "income")
      .reduce((accumulator, current) => current.amount + accumulator, 0);
    let totalExpense = filteredTransactions
      .filter((tran) => tran.type === "expense")
      .reduce((accumulator, current) => current.amount + accumulator, 0);

    return { category: cat, Income: totalIncome, Expense: totalExpense };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Income" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Expense" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AnalysisGraph;
