import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";
import bgmaps from "../assets/bgmaps.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        backgroundImage: `url(${bgmaps})`,
        backgroundSize: "cover",
        py: 4,
      }}
    >
      <Box sx={{ pb: 3 }}>
        <Paper
          component="form"
          sx={{
            width: 500,
            mx: "auto",
            display: "flex",
            justifyContent: "space-between",
            borderRadius: 25,
          }}
        >
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase placeholder="Find your branch..." fullWidth />
          <Button type="submit">Search</Button>
        </Paper>
      </Box>

      <Typography sx={{ pb: 3 }}>
        © {new Date().getFullYear()} Personal Finance Assistant
      </Typography>

      <Box sx={{ pb: 3 }}>
        <IconButton
          aria-label="facebook"
          href="https://www.facebook.com/"
          target="_blank"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          aria-label="twitter"
          href="https://x.com/home"
          target="_blank"
        >
          <Twitter />
        </IconButton>
        <IconButton
          aria-label="instagram"
          href="https://www.instagram.com/"
          target="_blank"
        >
          <InstagramIcon />
        </IconButton>
      </Box>

      <Box component="small" sx={{ color: "grey", "> *": { color: "grey" } }}>
        <Link to="/privacy-policy">Privacy Policy</Link> |
        <Link to="/terms-of-service">Terms of Service</Link> |
        <Link to="/cookie-policy">Cookie Policy</Link>
      </Box>
    </Box>
  );
};

export default Footer;
