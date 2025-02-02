import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ toggleSidebar }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1100, width: "100%", backgroundColor: "#2c3e50" }}>
      <Toolbar>
        {/* Hamburger Menu for Mobile */}
        <IconButton
          onClick={toggleSidebar}
          sx={{ mr: 2, display: { sm: "none" }, color: "#fff" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Admin Panel Text */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", color: "#fff" }}
        >
          I-Pangram Employee Management System
        </Typography>

        {/* Logout Button (Visible only if logged in) */}
        {isLoggedIn && (
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
