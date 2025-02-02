import { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Layout from "./Layout";

export default function Employees() {
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [employees, setEmployees] = useState([]);
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortByNameOrder, setSortByNameOrder] = useState("asc");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({});
  const [departments, setDepartments] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${BASEURL}/api/employees`, { headers });
      setEmployees(response.data);
      setSortedEmployees(response.data); // Initially set sorted employees
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole === "manager") {
      fetchEmployees();
    } else {
      setLoading(false);
      console.log("Only managers can access this data.");
    }
  }, []);

  const fetchEmployeesByLocation = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${BASEURL}/api/employees/filter/location`, { headers });

      // Ensure you are updating the state with a new reference
      const filteredEmployees = response.data;

      // Logging to check data change
      console.log("Before Filtering:", employees);
      console.log("After Filtering:", filteredEmployees);

      if (JSON.stringify(filteredEmployees) !== JSON.stringify(employees)) {
        setEmployees(filteredEmployees);  // Update employees state
        setSortedEmployees(filteredEmployees);  // Update sortedEmployees state
      }
    } catch (error) {
      console.error("Error fetching employees by location:", error);
    }
  };


  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${BASEURL}/api/departments`, { headers });
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSortByName = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const order = sortByNameOrder === "asc" ? "desc" : "asc"; // Toggle order
      const response = await axios.get(`${BASEURL}/api/employees/filter/name?order=${order}`, { headers });
      
      // Update state with the sorted employees
      setSortedEmployees(response.data);
      setSortByNameOrder(order); // Update the sort order to the new one
    } catch (error) {
      console.error("Error sorting employees by name:", error);
    }
  };
  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setUpdatedEmployee(employee);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!selectedEmployee?._id) {
        console.error("Selected employee ID not found");
        return;
      }

      const updatedFields = {
        ...(updatedEmployee.name && { name: updatedEmployee.name }),
        ...(updatedEmployee.location && { location: updatedEmployee.location }),
        ...(updatedEmployee.department && { department: updatedEmployee.department }),
      };

      await axios.put(`${BASEURL}/api/employees/${selectedEmployee._id}`, updatedFields, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASEURL}/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: "Employee deleted successfully" });
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      setSnackbar({ open: true, message: "Failed to delete employee" });
    }
  };

  return (
    <Layout>
      <Container>
        <Typography variant="h3" gutterBottom>
          Employees List
        </Typography>

        {/* Filter & Sort Buttons */}
        <Button variant="contained" onClick={handleSortByName} sx={{ mr: 2 }}>
          Sort by Name ({sortByNameOrder})
        </Button>
        <Button variant="contained" onClick={fetchEmployeesByLocation} sx={{ mr: 2 }}>
          Filter by Location
        </Button>

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Department</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedEmployees
                  .filter((employee) => employee.role === "employee")
                  .map((employee) => (
                    <TableRow key={employee._id} hover onClick={() => handleRowClick(employee)}>
                      <TableCell>{employee.name.charAt(0).toUpperCase() + employee.name.slice(1)}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}</TableCell>
                      <TableCell>{employee.location.charAt(0).toUpperCase() + employee.location.slice(1)}</TableCell>
                      <TableCell>{(employee.department ? employee.department.charAt(0).toUpperCase() + employee.department.slice(1) : "Not Assigned")}</TableCell>

                      <TableCell>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(employee._id);
                          }}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />

        {/* Update Modal */}
        <Dialog open={!!selectedEmployee} onClose={() => setSelectedEmployee(null)}>
          <DialogTitle>Update Employee</DialogTitle>
          <DialogContent>
            <TextField label="Name" fullWidth name="name" value={updatedEmployee.name || ""} onChange={handleUpdateChange} sx={{ mb: 2 }} />
            <TextField label="Location" fullWidth name="location" value={updatedEmployee.location || ""} onChange={handleUpdateChange} sx={{ mb: 2 }} />
            <Select fullWidth name="department" value={updatedEmployee.department || ""} onChange={handleUpdateChange} sx={{ mb: 2 }}>
              {departments.map((dept) => (
                <MenuItem key={dept._id} value={dept.name}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedEmployee(null)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}
