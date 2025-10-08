import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import api from "../../Services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "EMPLOYEE",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  

   // Same regex as backend
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
  let newErrors = {};

  if (!form.username.trim()) {
    newErrors.username = "Username is required";
  }

  if (!passwordRegex.test(form.password)) {
    newErrors.password =
      "Password must be at least 8 chars, include uppercase, lowercase, number, and special char";
  }

  if (!form.role) {
    newErrors.role = "Role is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // true if no errors
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    try {
      const response = await api.post("/auth/register", form);
      console.log("Backend Data:", response.data);
      if(response.data.isSuccess == true){
       Swal.fire({
        icon: "success",
        title: "Registered!",
        text: response.data.message,
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login")
      });
      setForm({
        username: "",
        password: "",
        role: "EMPLOYEE",
      });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: response.data.message,

        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong!";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    }
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Role</label>
            <select
              className={styles.input}
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="HR">HR</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <p className={styles.error}>{errors.role}</p>}
          </div>

          <button className={styles.button} type="submit">
            Register
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
