import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./EditEmployee.module.css";
import Swal from "sweetalert2";
import api from "../../Services/api";

function EditEmployee() {
  const { id } = useParams(); // employee id from URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    company: "",
    salary: "",
  });

  // Fetch employee details by ID
 useEffect(() => {
  const fetchEmployee = async () => {
    try {
      const response = await api.get(`/employee/employeeDetails/${id}`);
      setEmployee(response.data.employee);
    } catch (err) {
      console.error("Error fetching employee:", err);
    }
  };

  fetchEmployee();
}, [id]);


  // Handle form change
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Update employee
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    debugger
    const response = await api.put(`/employee/employeeUpdateById/${id}`, employee);
    Swal.fire({
        icon: "success",
        title: response.data.status,
        text: response.data.message,
    })
    navigate("/admin-dashboard"); // go back to list
  } catch (err) {
    console.error("Update error:", err);
  }
};


  return (
    <div className={styles.editContainer}>
      <h2 className={styles.editTitle}>Edit Employee</h2>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
          className={styles.editInput}
          required
        />
        <input
          type="company"
          name="company"
          value={employee.company}
          onChange={handleChange}
          placeholder="company"
          className={styles.editInput}
          required
        />
        <input
          type="text"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          placeholder="salary"
          className={styles.editInput}
          required
        />
      

        <button type="submit" className={styles.updateBtn}>
           Update 
        </button>
        
      </form>
      <button
                className={styles.backBtn}
                onClick={() => navigate("/admin-dashboard/employees")}
              >
                 Back 
              </button>
    </div>
  );
}

export default EditEmployee;
