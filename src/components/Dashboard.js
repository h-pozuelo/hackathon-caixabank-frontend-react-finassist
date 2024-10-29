import React, { Profiler } from "react";
import { useStore } from "@nanostores/react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import ExportButton from "./ExportButton";
import DownloadProfilerData from "./DownloadProfilerData";
import { onRenderCallback } from "../utils/onRenderCallback";
import { transactionsStore } from "../stores/transactionStore";

const AnalysisGraph = React.lazy(() => import("./AnalysisGraph"));
const BalanceOverTime = React.lazy(() => import("./BalanceOverTime"));
const Statistics = React.lazy(() => import("./Statistics"));
const Recommendations = React.lazy(() => import("./Recommendations"));
const RecentTransactions = React.lazy(() => import("./RecentTransactions"));

function Dashboard() {
  const transactions = useStore(transactionsStore);

  const totalIncome = transactions
    .filter((tran) => tran.type === "income")
    .reduce((accumulator, current) => accumulator + current.amount, 0);
  const totalExpense = transactions
    .filter((tran) => tran.type === "expense")
    .reduce((accumulator, current) => accumulator + current.amount, 0);
  const balance = transactions.reduce(
    (accumulator, current) =>
      current.type === "income"
        ? accumulator + current.amount
        : accumulator - current.amount,
    0
  );

  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          Dashboard
        </Typography>

        {/* Action Buttons Section */}
        {/* Instructions:
                    - Add a section with ExportButton and DownloadProfilerData components.
                    - The ExportButton should export the transaction data as a CSV file.
                    - The DownloadProfilerData button should export profiler data in JSON format.
                */}

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Income
              </Typography>
              <Typography
                variant="h5"
                data-testid="total-income"
                color="success"
              >
                {totalIncome.toFixed(2)} €
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Expenses
              </Typography>
              <Typography
                variant="h5"
                data-testid="total-expenses"
                color="error"
              >
                {totalExpense.toFixed(2)} €
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Balance
              </Typography>
              <Typography
                variant="h5"
                data-testid="balance"
                color={balance > 0 ? "success" : "error"}
              >
                {balance > 0 ? "+" : "-"}
                {Math.abs(balance).toFixed(2)} €
              </Typography>
              {/* Instructions:
                                - If the balance is negative, show a warning message.
                                - Display a message or alert if the budget limit has been exceeded.
                            */}
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Income and Expenses by Category
              </Typography>

              <AnalysisGraph />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Balance Over Time
              </Typography>

              <BalanceOverTime />
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Statistics />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Recommendations />
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Recent Transactions</Typography>
          <RecentTransactions transactions={transactions} />
        </Box>
      </Box>
    </Profiler>
  );
}

export default Dashboard;
