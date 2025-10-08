import React, { useState } from "react";
import api from "../../Services/api";
import Swal from "sweetalert2";
import styles from "./AddEmployee.module.css";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    company: "",
    salary: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/employee/add", form);
      Swal.fire({
        icon: "success",
        title: response.data.status,
        text: response.data.message,
      });
      setForm({ name: "", company: "", salary: "" });
      navigate("/admin-dashboard"); // redirect back to employee list
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Add Employee</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter employee name"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Company</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="Enter salary"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
             Add 
          </button>
        </form>

        <button
          className={styles.backBtn}
          onClick={() => navigate("/admin-dashboard/employees")}
        >
           Back 
        </button>
      </div>
    </div>
  );
}

export default AddEmployee;
