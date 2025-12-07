import React, { useEffect, useState } from "react";
import api from "../../../Services/api";
import styles from "./HrTaskDetails.module.css";
import DatePicker from "react-datepicker";
import HrUpdateTask from "../Task/HrUpdateTask"; // Import your update component
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

function HrTaskDetails() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    assignedBy: "",
    assignedTo: "",
    status: ""
  });

  const [employees, setEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // for edit modal

  useEffect(() => {
    const loggedHr = localStorage.getItem("username");

    // Set logged HR in filters
    setFilters(prev => ({ ...prev, assignedBy: loggedHr }));

    fetchFilteredTasks({ assignedBy: loggedHr }); // load tasks
    fetchEmployees(); // load employees
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employee/employeeDetails");
      if (res.data.isSuccess) {
        setEmployees(res.data.employees);
      }
    } catch (err) {
      Swal.fire("Error", "Failed to fetch employees", "error");
    }
  };

  const fetchAllTasks = async () => {
    try {
      const response = await api.get("/tasks/fetchAllTasks");
      setTasks(response.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const fetchFilteredTasks = async (queryParams = {}) => {
    try {
      const response = await api.get("/tasks/filter", { params: queryParams });
      setTasks(response.data.data.tasks || []);
    } catch (err) {
      console.error("Error fetching filtered tasks", err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "status-pending";
      case "IN_PROGRESS":
        return "status-inprogress";
      case "ON_HOLD":
        return "status-hold";
      case "COMPLETED":
        return "status-completed";
      default:
        return "";
    }
  };

  const formatDateForBackend = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleFilter = () => {
    const queryParams = { assignedBy: filters.assignedBy }; // always include logged HR

    if (filters.fromDate) queryParams.fromDateStr = formatDateForBackend(filters.fromDate);
    if (filters.toDate) queryParams.toDateStr = formatDateForBackend(filters.toDate);
    if (filters.assignedTo) queryParams.assignedTo = filters.assignedTo;
    if (filters.status) queryParams.status = filters.status;

    fetchFilteredTasks(queryParams);
  };

  const handleDelete = async (taskId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }
    
);

    if (confirm.isConfirmed) {
      try {
        const res = await api.delete(`/tasks/delete/${taskId}`);
        if (res.data.isSuccess) {
          Swal.fire("Deleted!", res.data.message || "Task deleted.", "success");
           setTasks(prev => prev.filter(task => task.id !== taskId));
        } else {
          Swal.fire("Error", res.data.message || "Failed to delete task", "error");
        }
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Something went wrong!", "error");
      }
    }
  };

  return (
    <div className={styles.taskList}>
      {/* Header and Filters */}
      <div className={styles.header}>
        <h2>Task Details</h2>
        <div className={styles.filters}>
          
          {/* Assigned Date */}
          <div className={styles.dateContainer}>
            <label className={styles.dateLabel}>Assigned Date</label>
            <DatePicker
              selected={filters.fromDate}
              onChange={(date) => setFilters({ ...filters, fromDate: date })}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
            />
          </div>

          {/* Due Date */}
          <div className={styles.dateContainer}>
            <label className={styles.dateLabel}>Due Date</label>
            <DatePicker
              selected={filters.toDate}
              onChange={(date) => setFilters({ ...filters, toDate: date })}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
            />
          </div>

          {/* Assigned By (logged-in HR, read-only input) */}
          <div className={styles.dropdownContainer}>
            <label className={styles.dropdownLabel}>Assigned By</label>
            <input
              type="text"
              value={filters.assignedBy || ""}
              readOnly
              className={styles.readonlyInput}
            />
          </div>

          {/* Assigned To */}
          <div className={styles.dropdownContainer}>
            <label className={styles.dropdownLabel}>Assigned To</label>
            <select
              value={filters.assignedTo}
              onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}
            >
              <option value="">All</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.username}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className={styles.dropdownContainer}>
            <label className={styles.dropdownLabel}>Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <button className={styles.filterBtn} onClick={handleFilter}>Go</button>
        </div>
      </div>

      {/* Status Legend */}
      <div className={styles.legend}>
        <span><div className={styles.dotPending}></div> Pending</span>
        <span><div className={styles.dotProgress}></div> In Progress</span>
        <span><div className={styles.dotHold}></div> Hold</span>
        <span><div className={styles.dotCompleted}></div> Completed</span>
      </div>

      {/* Task Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task Id</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Assigned By</th>
            <th>Assigned To</th>
            <th>Assigned Date</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className={styles[getStatusClass(task.status)]}>
                <td>{task.id}</td>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td>{task.assignedBy}</td>
                <td>{task.assignedTo}</td>
                <td>{task.assignedDate}</td>
                <td>{task.dueDate}</td>
                <td>
                  <span
                    className={styles.iconEdit}
                    style={{ cursor: "pointer" }}
                    title="Edit Task"
                    onClick={() => navigate(`/hr-dashboard/update-task/${task.id}`)}
                  >
                    ✏️
                  </span>

                  <span
                    className={styles.iconDelete}
                    onClick={() => handleDelete(task.id)}
                    title="Delete Task"
                  >🗑️</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Task Modal */}
      {selectedTask && (
        <HrUpdateTask
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={fetchAllTasks} // refresh after update
        />
      )}
    </div>
  );
}

export default HrTaskDetails;
