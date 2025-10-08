    import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import styles from "./Tasks.module.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    assignedBy: "",
    assignedTo: "",
  });

  const [hrList, setHrList] = useState([]); // mock HRs
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    fetchAllTasks();
    fetchHrList();
    fetchEmployeeList();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const response = await api.get("/tasks/fetchAllTasks"); // your backend endpoint
      setTasks(response.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const fetchHrList = async () => {
  try {
    const response = await api.get("/users/employeeList"); 
    setEmployeeList(response.data.usernames || []);  
  } catch (err) {
    console.error("Error fetching HR list", err);
  }
};

 const fetchEmployeeList = async () => {
  try {
    const response = await api.get("/users/hrList"); 
    setHrList(response.data.usernames || []);  
  } catch (err) {
    console.error("Error fetching HR list", err);
  }
};

  const fetchFilteredTasks = async (queryParams = {}) => {
  try {
    debugger;
    const response = await api.get("/tasks/filter", {
      params: queryParams,
    });
    setTasks(response.data.tasks || []);
  } catch (err) {
    console.error("Error fetching filtered tasks", err);
  }
};


  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return styles["status-pending"];
      case "IN_PROGRESS":
        return styles["status-inprogress"];
      case "HOLD":
        return styles["status-hold"];
      case "COMPLETED":
        return styles["status-completed"];
      default:
        return "";
    }
  };

  const formatDateForBackend = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

  const handleFilter = () => {
    debugger;
    const queryParams = {};
     if (filters.fromDate) queryParams.fromDateStr = formatDateForBackend(filters.fromDate);
  if (filters.toDate) queryParams.toDateStr = formatDateForBackend(filters.toDate);
    if (filters.assignedBy) queryParams.assignedBy = filters.assignedBy;
    if (filters.assignedTo) queryParams.assignedTo = filters.assignedTo;

    fetchFilteredTasks(queryParams);
  };

  return (
    <div className={styles.taskList}>
      <div className={styles.header}>
  <h2>Task Details</h2>
  <div className={styles.filters}>
   <div className={styles.dateContainer}>
    <label className={styles.dateLabel}>Assigned Date</label>
     <DatePicker
      selected={filters.fromDate}
      onChange={(date) => setFilters({ ...filters, fromDate: date })}
      dateFormat="dd-MM-yyyy"
      placeholderText="Select Date"
    />
   </div>
    <div className={styles.dateContainer}>
      <label className={styles.dateLabel}>Due Date</label>
      <DatePicker
      selected={filters.toDate}
      onChange={(date) => setFilters({ ...filters, toDate: date })}
      dateFormat="dd-MM-yyyy"
      placeholderText="Select Date"
    />
    </div>
    <div className={styles.dropdownContainer}>
      <label className={styles.dropdownLabel}>Assigned By</label>
      <select
      value={filters.assignedBy}
      onChange={(e) => setFilters({ ...filters, assignedBy: e.target.value })}
    >
      <option value="">Assigned By (All)</option>
      {hrList.map((hr, idx) => (
        <option key={idx} value={hr}>{hr}</option>
      ))}
    </select>
    </div>
    <div className={styles.dropdownContainer}>
      <label className={styles.dropdownLabel}>Assigned To</label>
      <select
      value={filters.assignedTo}
      onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}
    >
      <option value="">Assigned To (All)</option>
      {employeeList.map((emp, idx) => (
        <option key={idx} value={emp}>{emp}</option>
      ))}
    </select>
    </div>
    <button className={styles.filterBtn} onClick={handleFilter}>
      Go
    </button>
  </div>
</div>



      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task Id</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Assigned By</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Assigned Date</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td>{task.assignedBy}</td>
                <td>{task.assignedTo}</td>
                <td>
                      <span className={getStatusClass(task.status)}>
                    {task.status}
                  </span>
                </td>
                <td>{task.assignedDate}</td>
                <td>{task.dueDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;
