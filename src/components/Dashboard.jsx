"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Container, Snackbar, Alert } from "@mui/material";
import Layout from "./Layout";
import Card from "./Cards/card";

export default function Dashboard() {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!userId) {
          throw new Error("User ID not found in localStorage");
        }
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${BASEURL}/api/employees/${userId}`, { headers:headers });
        setEmployeeDetails(response.data);
        setLoading(false);
        setSnackbarMessage("Employee details fetched successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setLoading(false);
        setError(error.message);
        setSnackbarMessage("Failed to fetch employee details.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    };

    fetchEmployeeDetails();
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Layout>
      <Container>
        <Typography variant="h3" gutterBottom>
          Welcome to Employee Management System
        </Typography>
        <div>
          <Card />
        </div>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : (
          <div>
            <Typography variant="h5">Employee Details</Typography>
            <Typography>Name: {employeeDetails.name}</Typography>
            <Typography>Email: {employeeDetails.email}</Typography>
            <Typography>Role: {employeeDetails.role}</Typography>
            <Typography>Location: {employeeDetails.location}</Typography>
            <Typography>Department: {employeeDetails.department || "Not Assigned"}</Typography>
          </div>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}
