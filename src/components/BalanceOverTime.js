import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BalanceOverTime() {
  const transactions = useStore(transactionsStore);

  let cumulativeBalance = 0;

  const data = Object.entries(
    transactions
      .sort((a, b) => a.date > b.date)
      .reduce((accumulator, current) => {
        current.type === "income"
          ? (cumulativeBalance += current.amount)
          : (cumulativeBalance -= current.amount);
        accumulator[current.date] = cumulativeBalance;
        return accumulator;
      }, {})
  ).map(([key, value]) => {
    return { date: key, Balance: value };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default BalanceOverTime;
