import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ExportButton from "./ExportButton";
import { userSettingsStore } from "../stores/userSettingsStore";

function Analysis() {
  const transactions = useStore(transactionsStore);

  const [timeFrame, setTimeFrame] = useState("monthly");
  const [reportType, setReportType] = useState("trend");

  const trendData = Object.entries(
    transactions
      .sort((a, b) => a.date > b.date)
      .reduce((a, c) => {
        let date = new Date(c.date);
        let tf =
          timeFrame === "daily"
            ? date.toLocaleDateString()
            : timeFrame === "weekly"
            ? ""
            : timeFrame === "monthly"
            ? `${date.getFullYear()}-${date.getMonth() + 1}`
            : date.getFullYear();

        if (!a[tf]) a[tf] = { income: 0, expense: 0 };

        c.type === "income"
          ? (a[tf].income += c.amount)
          : (a[tf].expense += c.amount);

        return a;
      }, {})
  ).map(([key, value]) => {
    return { key: key, income: value.income, expense: value.expense };
  });

  const budgetData = Object.entries(
    transactions
      .sort((a, b) => a.date > b.date)
      .reduce((a, c) => {
        let date = new Date(c.date);
        let tf = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!a[tf])
          a[tf] = {
            budget: userSettingsStore.get().totalBudgetLimit,
            actual: 0,
          };

        if (c.type === "expense") a[tf].actual += c.amount;

        return a;
      }, {})
  ).map(([key, value]) => {
    return { key: key, budget: value.budget, actual: value.actual };
  });

  return (
    <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Advanced Analysis
      </Typography>

      {transactions.length === 0 && (
        <Typography variant="h6" color="text.secondary">
          No transactions available.
        </Typography>
      )}

      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
            <Select
              labelId="timeframe-select-label"
              id="timeframe-select"
              label="Time Frame"
              value={timeFrame}
              onChange={(e) => {
                setTimeFrame(e.target.value);
              }}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="report-type-select-label">Report Type</InputLabel>
            <Select
              labelId="report-type-select-label"
              id="report-type-select"
              label="Report Type"
              value={reportType}
              onChange={(e) => {
                setReportType(e.target.value);
              }}
            >
              <MenuItem value="trend">Trend Analysis</MenuItem>
              <MenuItem value="budget">Budget vs. Actual</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Export Button */}
        {/* Instructions:
                    - Implement the ExportButton component with the appropriate data and headers.
                    - The data and headers should be based on the selected report type. */}
        <Grid item xs={12} sm={6} md={4}>
          <ExportButton data={[]} filename={""} headers={[""]} />
        </Grid>
      </Grid>

      {reportType === "trend" && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Income and Expenses Trend
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#28B463"
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#E74C3C"
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {reportType === "budget" && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Budget vs. Actual Expenses
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={budgetData}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="budget"
                    stackId="a"
                    fill="#FFC658"
                    name="Budget"
                  />
                  <Bar
                    dataKey="actual"
                    stackId="b"
                    fill="#FF8042"
                    name="Actual"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Savings Goals
            </Typography>
            <Typography>No savings goals set.</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Net Worth Over Time
            </Typography>
            <Typography>No net worth data available.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analysis;
