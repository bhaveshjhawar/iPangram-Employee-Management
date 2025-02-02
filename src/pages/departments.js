import { useEffect, useState } from "react";
import Departments from "@/components/Departments";
import { useRouter } from "next/router";
import { Box, Typography, Button, Modal } from "@mui/material";

export default function DepartmentsPage() {
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    
    if (userRole === "employee") {
      setOpen(true); // Show access denied modal
    }
  }, []);

  return (
    <Box sx={{ position: "relative", filter: role === "employee" ? "blur(10px)" : "none" }}>
      <Departments />
      
      {/* Access Denied Modal */}
      <Modal open={open} onClose={() => router.push("/")}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You do not have permission to view this page.
          </Typography>
          <Button variant="contained" onClick={() => router.push("/")}>
            Go Back
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
