import React, { useEffect, useState } from "react";
import api from "../../../Services/api";
import styles from "./LeaveRequests.module.css";
import Swal from "sweetalert2";

function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = async () => {
    try {
      const res = await api.get("/leaves/allLeaves"); // your backend endpoint
      if (res.data.isSuccess) {
        setLeaveRequests(res.data.data); // <-- use `data` from response
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Unable to fetch leave requests", "error");
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleAction = async (id, action) => {
  try {
    const res = await api.put(`/leaves/status/${id}?action=${action}`);
    if (res.data.isSuccess) {
      Swal.fire("Success", res.data.message, "success");
      fetchLeaveRequests();
    }
  } catch (err) {
    Swal.fire("Error", "Something went wrong", "error");
  }
};


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Leave Requests</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No leave requests found
              </td>
            </tr>
          ) : (
            leaveRequests.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.employeeName}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.fromDate}</td>
                <td>{leave.toDate}</td>
                <td>{leave.reason}</td>
                <td>
                  {leave.leaveStatus === "PENDING" && (
                    <span className={styles.pending}>{leave.leaveStatus}</span>
                  )}
                  {leave.leaveStatus === "APPROVED" && (
                    <span className={styles.approved}>{leave.leaveStatus}</span>
                  )}
                  {leave.leaveStatus === "REJECTED" && (
                    <span className={styles.rejected}>{leave.leaveStatus}</span>
                  )}
                </td>
                <td>
                  {leave.leaveStatus === "PENDING" ? (
                    <>
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleAction(leave.id, "approve")}
                      >
                        Approve
                      </button>
                      <button
                        className={styles.rejectBtn}
                        onClick={() => handleAction(leave.id, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequests;
