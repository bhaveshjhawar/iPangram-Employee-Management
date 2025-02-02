"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Container, Snackbar, Alert ,Card, CardContent, Grid, CircularProgress,Paper} from "@mui/material";
import Layout from "./Layout";

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
    <Container maxWidth="md" sx={{ mt: 5 }}>
    <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center", bgcolor: "#f5f5f5" }}>
      <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
        Dashboard
      </Typography>

      {loading ? (
        <CircularProgress color="secondary" />
      ) : error ? (
        <Typography color="error" variant="h6" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      ) : (
        <Card elevation={3} sx={{ maxWidth: 500, mx: "auto", mt: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" color="secondary" gutterBottom>
              Employee Details
            </Typography>
            <Grid container spacing={2} sx={{ textAlign: "left" }}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Name:</strong> {employeeDetails.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Email:</strong> {employeeDetails.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Role:</strong> {employeeDetails.role}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Location:</strong> {employeeDetails.location}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Department:</strong> {employeeDetails.department || "Not Assigned"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Paper>

    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </Container>
    </Layout>
  );
}
