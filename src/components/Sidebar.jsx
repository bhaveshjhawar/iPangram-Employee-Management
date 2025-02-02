import { Drawer, List, ListItem, ListItemText, IconButton, Divider, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Sidebar({ isMobile, isOpen, toggleSidebar }) {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
    toggleSidebar();
  };

  return (
    <>
      {/* Hamburger menu only for mobile */}
      {isMobile && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1200,
            color: "#fff", // Make sure the menu icon is visible
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          width: isMobile ? "80vw" : "240px", // Increase width for better content space
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "80vw" : "240px", // Same width for paper
            boxSizing: "border-box",
            background: "linear-gradient(135deg, rgba(44, 62, 80, 1) 0%, rgba(52, 152, 219, 0.8) 100%)", // Gradient background
            color: "#fff", // White text color
            backdropFilter: "blur(10px)", // Backdrop blur effect for a sleek look
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow to add depth
            transition: "all 0.3s ease-in-out", // Smooth transition
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", color: "#fff" }}>
          <img
            src="logo.png" // Replace with the path to your logo
            alt="Logo"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </Box>


        <List sx={{ marginTop: 2 }}>
          <ListItem 
            button 
            onClick={() => navigateTo("/")}
            sx={{ cursor: "pointer" }} // Add cursor pointer for interactivity
          >
            <ListItemText primary="Dashboard" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem 
            button 
            onClick={() => navigateTo("/employees")}
            sx={{ cursor: "pointer" }} // Add cursor pointer for interactivity
          >
            <ListItemText primary="All Employees" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem 
            button 
            onClick={() => navigateTo("/departments")}
            sx={{ cursor: "pointer" }} // Add cursor pointer for interactivity
          >
            <ListItemText primary="All Departments" sx={{ color: "#fff" }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
