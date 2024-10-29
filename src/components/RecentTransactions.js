import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function RecentTransactions({ transactions }) {
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    setRecentTransactions(
      transactions.sort((a, b) => a.date < b.date).slice(0, 5)
    );
  }, [transactions]);

  return (
    <div>
      <h3>Recent Transactions</h3>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount (€)</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentTransactions &&
              recentTransactions.map((tran, index) => (
                <TableRow key={index}>
                  <TableCell>{tran.description}</TableCell>
                  <TableCell>{tran.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {tran.type === "income" ? "Income" : "Expense"}
                  </TableCell>
                  <TableCell>{tran.category}</TableCell>
                  <TableCell>
                    {new Date(tran.date).toLocaleDateString("en-US")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RecentTransactions;
