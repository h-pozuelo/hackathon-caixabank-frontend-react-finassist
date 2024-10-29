import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Button,
  Badge,
  Avatar,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { authStore, logout } from "../stores/authStore";
import icon from "../assets/caixabank-icon-blue.png";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" color="transparent" component="nav">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <IconButton sx={{ width: 50, height: 50 }}>
            <img
              src={icon}
              alt="caixabank-icon-blue"
              width="40"
              height="auto"
            />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", fontStyle: "italic" },
            }}
          >
            CaixaBankNow
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {(authStore.get().isAuthenticated
              ? [
                  "Dashboard",
                  "Transactions",
                  "Analysis",
                  "Settings",
                  "Support",
                  "Logout",
                ]
              : ["Login", "Register"]
            ).map((text, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={`/${
                  text !== "Dashboard" && text !== "Logout"
                    ? text.toLowerCase()
                    : ""
                }`}
                onClick={() => {
                  if (text === "Logout") logout();
                }}
              >
                {text}
              </Button>
            ))}

            <IconButton>
              <Badge color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {authStore.get().isAuthenticated && (
              <IconButton>
                <Tooltip title={authStore.get().user.email}>
                  <Avatar alt={authStore.get().user.email} />
                </Tooltip>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box>
          <List sx={{ width: 250 }}>
            {[
              "Dashboard",
              "Transactions",
              "Analysis",
              "Settings",
              "Support",
            ].map((text, index) => (
              <ListItem
                key={index}
                component={Link}
                to={`/${text !== "Dashboard" ? text.toLowerCase() : ""}`}
                disablePadding
              >
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
