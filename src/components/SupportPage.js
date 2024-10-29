import React, { useState, useEffect, Profiler, Suspense } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import { onRenderCallback } from "../utils/onRenderCallback";

function SupportPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((e) => {
        console.log(e.message);
        setError(e.message);
      })
      .finally(setLoading(false));
  }, []);

  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setFilteredUsers(
      users.filter((user) => user.name.includes(event.target.value))
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Profiler id="SupportPage" onRender={onRenderCallback}>
      <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
        <Typography variant="h4" gutterBottom color="primary">
          Support Contacts
        </Typography>

        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />

        <Suspense fallback={<CircularProgress />}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <List>
              {(searchTerm ? filteredUsers : users).map((user, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Button
                      edge="end"
                      arial="contact"
                      variant="contained"
                      href={`mailto:${user.email}`}
                    >
                      Contact
                    </Button>
                  }
                  sx={{ mb: 2 }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={user.name}
                      src={`https://i.pravatar.cc/150?img=${user.id}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.name} - ${user.email}`}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text-primary", display: "inline" }}
                        >
                          Phone: {user.phone} | Company: {user.company.name}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Suspense>
      </Box>
    </Profiler>
  );
}

export default SupportPage;
