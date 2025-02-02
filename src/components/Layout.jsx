"use client"
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        isMobile={isMobile}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          marginLeft: isMobile ? 0 : "240px", // Adjust margin based on sidebar visibility
          transition: "margin-left 0.3s ease-in-out", // Smooth transition for opening/closing sidebar
        }}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Adjust content margin-top so it doesn't get hidden behind the navbar */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: "64px", // Margin top to avoid being hidden behind navbar (assuming 64px height)
          }}
        >
          {children}
        </Box>

     
      </Box>
    </Box>
  );
}

