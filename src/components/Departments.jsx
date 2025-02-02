import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Layout from "./Layout";

export default function Departments() {
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [updatedDepartment, setUpdatedDepartment] = useState({});
  
  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${BASEURL}/api/departments`, { headers });
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole === "manager") {
      fetchDepartments();
    } else {
      setLoading(false);
      console.log("Only managers can access this data.");
    }
  }, []);


  const handleRowClick = useCallback((department) => {
    setSelectedDepartment(department);
    setUpdatedDepartment(department);
  }, []);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDepartment({ ...updatedDepartment, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!selectedDepartment?._id) {
        console.error("Selected department ID not found");
        return;
      }

      const updatedFields = {
        ...(updatedDepartment.name && { name: updatedDepartment.name }),
      };

      await axios.put(`${BASEURL}/api/departments/${selectedDepartment._id}`, updatedFields, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedDepartment(null);
      fetchDepartments();
      setSnackbarMessage("Department updated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating department:", error);
      setSnackbarMessage("Error updating department.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCreateDepartment = async () => {
    try {
        const token = localStorage.getItem("token");
        const newDepartment = { name: updatedDepartment.name }; // Assuming you’re passing the name of the new department.
    
        await axios.post(`${BASEURL}/api/departments`, newDepartment, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        setSnackbarMessage("Department created successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
    
        fetchDepartments(); // Reload the department list after creation
      } catch (error) {
        console.error("Error creating department:", error);
    
        // Handle specific HTTP errors like 400 (Bad Request)
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
            setSnackbarMessage(data.message || "Department already exists!");
          } else {
            setSnackbarMessage("An unexpected error occurred.");
          }
        } else {
          // Handle network errors or unexpected issues
          setSnackbarMessage("Unable to connect. Please try again later.");
        }
    
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
  };
  

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.delete(`${BASEURL}/api/departments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchDepartments();
      setSnackbarMessage("Department deleted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting department:", error);
      setSnackbarMessage("Error deleting department.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Layout>
      <Container>
        <Typography variant="h3" gutterBottom>
          Departments List
        </Typography>

       <TextField
  label="Department Name"
  fullWidth
  value={updatedDepartment.name || ""}
  onChange={handleUpdateChange}
  name="name"
  sx={{ mb: 2 }}
/>
<Button
  variant="contained"
  onClick={handleCreateDepartment}
  disabled={!updatedDepartment.name} // Disable the button if there is no text
>
  Add Department
</Button>
       

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map((department) => (
                  <TableRow key={department._id} hover onClick={() => handleRowClick(department)}>
                    <TableCell>{department.name}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleRowClick(department)} >
                        Edit
                      </Button>
                      <IconButton color="error"   onClick={(e) => {
                        e.stopPropagation(); // Prevents the row click from firing
                        handleDelete(department._id);
                      }}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Update Modal */}
        <Dialog open={!!selectedDepartment} onClose={() => setSelectedDepartment(null)}>
          <DialogTitle>Update Department</DialogTitle>
          <DialogContent>
            <TextField label="Name" fullWidth name="name" value={updatedDepartment.name || ""} onChange={handleUpdateChange} sx={{ mb: 2 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedDepartment(null)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for API Response */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
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
