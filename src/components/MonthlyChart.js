import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MonthlyChart({ transactions }) {
  const dataMap = {};

  transactions.forEach((t) => {
    let date = new Date(t.date);
    let monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!dataMap[monthYear]) dataMap[monthYear] = { income: 0, expense: 0 };

    t.type === "income"
      ? (dataMap[monthYear].income += t.amount)
      : (dataMap[monthYear].expense += t.amount);
  });

  const data = Object.entries(dataMap).map(([key, value]) => {
    return { month: key, income: value.income, expense: value.expense };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#8884d8"
          name="Expense"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MonthlyChart;
