import React, { useState, useMemo, useCallback } from "react";
import { useStore } from "@nanostores/react";
import {
  deleteTransaction as deleteTran,
  transactionsStore,
} from "../stores/transactionStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import TransactionForm from "./TransactionForm";
import TransactionRow from "./TransactionRow";
import { allCategories } from "../constants/categories";

function TransactionList() {
  const transactions = useStore(transactionsStore);
  const [showModal, setShowModal] = useState(false);
  const [transaction, setTransaction] = useState(null);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deleteTransaction = useCallback(
    (id) => {
      deleteTran(id);
    },
    [transactions]
  );

  const handleEdit = useCallback((transaction) => {
    setTransaction(transaction);
    setShowModal(true);
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transaction List
      </Typography>

      {showModal && (
        <TransactionForm
          onClose={() => {
            setShowModal(false);
            setTransaction(null);
          }}
          transactionToEdit={transaction}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add Transaction
      </Button>

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-category-label">Category</InputLabel>
          <Select
            labelId="filter-category-label"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {allCategories &&
              allCategories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-type-label">Type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="sort-field-label">Sort By</InputLabel>
          <Select
            labelId="sort-field-label"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount (€)</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions
                .filter(
                  (tran) =>
                    (tran.category === filterCategory ||
                      "" === filterCategory) &&
                    (tran.type === filterType || "" === filterType)
                )
                .map((tran, index) => (
                  <TransactionRow
                    key={index}
                    transaction={tran}
                    onEdit={handleEdit}
                    onDelete={deleteTransaction}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TransactionList;
