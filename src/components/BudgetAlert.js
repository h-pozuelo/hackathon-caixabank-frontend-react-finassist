import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { userSettingsStore } from "../stores/userSettingsStore";
import { transactionsStore } from "../stores/transactionStore";
import { Alert } from "@mui/material";
import {
  budgetAlertStore,
  resetBudgetAlert,
  updateBudgetAlert,
} from "../stores/budgetAlertStore";

const BudgetAlert = () => {
  const userSettings = useStore(userSettingsStore);
  const transactions = useStore(transactionsStore);

  const totalExpense = transactions.reduce(
    (accumulator, current) => accumulator + current.amount,
    0
  );

  const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;

  useEffect(() => {
    budgetExceeded
      ? updateBudgetAlert("Budget has been exceeded!")
      : resetBudgetAlert();
  }, [budgetExceeded, userSettings.totalBudgetLimit, totalExpense]);

  return (
    <>
      {budgetExceeded ? (
        <Alert severity="warning">{budgetAlertStore.get().message}</Alert>
      ) : null}
    </>
  );
};

export default BudgetAlert;
