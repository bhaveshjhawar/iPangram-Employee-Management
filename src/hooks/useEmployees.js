import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useEmployees = () => {
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEmployees = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: token };

      console.log("Fetching employees from:", `${BASEURL}/api/employees`);
      console.log("Headers:", headers);

      const response = await axios.get(`${BASEURL}/api/employees`, { headers });

      console.log("Employees data:", response.data);
      setEmployees(response.data); // Adjust based on actual API response
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return { employees, loading };
};

export default useEmployees;
