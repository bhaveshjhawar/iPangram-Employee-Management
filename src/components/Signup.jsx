import { useState } from "react";
import { TextField, Button, Box, Typography, Container, Snackbar, Alert, Link, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "employee", location: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, severity: "success", text: "" });

  const router = useRouter();

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "email":
        if (!value) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
        break;
      case "password":
        if (!value) error = "Password is required.";
        else if (value.length < 6) error = "Password must be at least 6 characters.";
        break;
      case "location":
        if (!value.trim()) error = "Location is required.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Revalidate all fields before submitting
    Object.keys(formData).forEach((field) => validateField(field, formData[field]));

    // Check if there are any validation errors
    if (Object.values(errors).some((error) => error)) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/signup", formData);
      
      setSnackbar({ open: true, severity: "success", text: "Signup successful! Redirecting..." });

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setSnackbar({ 
        open: true, 
        severity: "error", 
        text: err.response?.data?.message || "Signup failed." 
      });

      // Handle server-side email uniqueness error
      if (err.response?.data?.message?.includes("email")) {
        setErrors((prev) => ({ ...prev, email: "Email already exists." }));
      }
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField 
            fullWidth 
            label="Name" 
            name="name" 
            onChange={handleChange} 
            onBlur={(e) => validateField(e.target.name, e.target.value)}
            margin="normal" 
            required 
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField 
            fullWidth 
            label="Email" 
            name="email" 
            type="email" 
            onChange={handleChange} 
            onBlur={(e) => validateField(e.target.name, e.target.value)}
            margin="normal" 
            required 
            error={!!errors.email}
            helperText={errors.email}
          />
          <InputLabel>Role</InputLabel>
          <Select
          fullWidth
            name="role"
            value={formData.role}  // Use formData.role for the value
            onChange={handleChange}
            label="Role"
            margin="normal"
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
          </Select>
          <TextField 
            fullWidth 
            label="Password" 
            name="password" 
            type="password" 
            onChange={handleChange} 
            onBlur={(e) => validateField(e.target.name, e.target.value)}
            margin="normal" 
            required 
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField 
            fullWidth 
            label="Location" 
            name="location" 
            onChange={handleChange} 
            onBlur={(e) => validateField(e.target.name, e.target.value)}
            margin="normal" 
            required 
            error={!!errors.location}
            helperText={errors.location}
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary" 
            disabled={loading} 
            sx={{ mt: 2 }}
          >
            {loading ? "Signing up..." : "Signup"}
          </Button>
        </form>
        <Typography textAlign="center" sx={{ mt: 2 }}>
        Already an employee?{" "}
        <Link href="/login" underline="hover">
          Login Here
        </Link>
      </Typography>
      </Box>

      {/* Snackbar for success or error messages */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.text}
        </Alert>
      </Snackbar>
    </Container>
  );
}
