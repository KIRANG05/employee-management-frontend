import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employee/employeeDetails");
      setEmployees(response.data.employees || []);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Employee Portal</h2>
        <nav>
          <ul>
  <li><Link to="/dashboard">Dashboard</Link></li>
  <li><Link to="/add-employee">Add Employee</Link></li>
  <li><Link to="/manage-employees">Manage Employees</Link></li>
  <li><Link to="/reports">Reports</Link></li>
</ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <div className={styles.userMenu}> Hello {username ? username.charAt(0).toUpperCase() + username.slice(1) : "User"} 👋</div>
        </header>

        <section className={styles.overview}>
  <div className={styles.card}>
    <h3>Total Employees</h3>
    <p>{employees.length}</p>
  </div>
  <div className={styles.card}>
    <h3>Total Salary</h3>
    <p>₹ {employees.reduce((sum, emp) => sum + emp.salary, 0)}</p>
  </div>
  <div className={styles.card}>
    <h3>Companies</h3>
    <p>{[...new Set(employees.map(emp => emp.company))].length}</p>
  </div>
</section>


        <section className={styles.content}>
          <h2>Employee List</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Company</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.company}</td>
                    <td>{emp.salary}</td>
                    <td className={styles.actions}>
  <button className={styles.editBtn} title="Edit">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
      <path d="M17.414 2.586a2 2 0 010 2.828l-10 10a2 2 0 01-.878.505l-4 1a1 1 0 01-1.213-1.213l1-4a2 2 0 01.505-.878l10-10a2 2 0 012.828 0z" />
    </svg>
  </button>

  <button className={styles.deleteBtn} title="Delete">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 100 2h.293l1.182 10.447A2 2 0 007.463 18h5.074a2 2 0 001.988-1.553L15.707 6H16a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM8 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
  </button>
</td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
