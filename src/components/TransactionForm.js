import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  addTransaction,
  setTransactions,
  transactionsStore,
} from "../stores/transactionStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
} from "@mui/material";
import { categoryKeywords } from "../constants/categoryKeywords";
import { allCategories } from "../constants/categories";

function TransactionForm({ transactionToEdit, onClose }) {
  const transactions = useStore(transactionsStore);

  const [description, setDescription] = useState(
    transactionToEdit ? transactionToEdit.description : ""
  );
  const [amount, setAmount] = useState(
    transactionToEdit ? transactionToEdit.amount : ""
  );
  const [type, setType] = useState(
    transactionToEdit ? transactionToEdit.type : "expense"
  );
  const [category, setCategory] = useState(
    transactionToEdit ? transactionToEdit.category : ""
  );
  const [date, setDate] = useState(
    transactionToEdit
      ? transactionToEdit.date
      : new Date().toISOString().split("T")[0]
  );

  const assignCategory = (desc) => {
    let cat = "Other Expenses";

    Object.entries(categoryKeywords).forEach(([key, value]) => {
      if (value.some((v) => desc.includes(v))) cat = key;
    });

    return cat;
  };

  useEffect(() => {
    if (!transactionToEdit) {
      let cat = assignCategory(description);
      setCategory(cat);
    }
  }, [description, transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formElement = e.target;
    let isValid = formElement.checkValidity();

    if (!isValid) return;

    if (!transactionToEdit) {
      let id = !(transactions && transactions.length > 0)
        ? 1
        : transactions.slice(-1).pop().id + 1;

      let transaction = {
        id: id,
        description,
        amount: Number(amount),
        type,
        category,
        date,
      };

      addTransaction(transaction);
    } else {
      transactionToEdit = {
        id: transactionToEdit.id,
        description,
        amount: Number(amount),
        type,
        category,
        date,
      };

      let index = transactions.findIndex(
        (tran) => tran.id === transactionToEdit.id
      );

      if (index !== -1) {
        transactions[index] = transactionToEdit;
        setTransactions(transactions);
      }
    }

    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                required
                name="description"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount (€)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
                required
                inputProps={{ min: 0, step: "0.01" }}
                name="amount"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Type"
                  name="type"
                  inputProps={{ name: "filterTypeForm" }}
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  name="category"
                  inputProps={{ name: "filterCategoryForm" }}
                >
                  {allCategories &&
                    allCategories.map((cat, index) => (
                      <MenuItem key={index} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  <MenuItem value="Other Expenses">Other Expenses</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                margin="normal"
                required
                name="date"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: 2,
            }}
          >
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="add-transaction-button"
            >
              {transactionToEdit ? "Update" : "Add"}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TransactionForm;
