import React, { useEffect, useState } from "react";
import api from "../../../Services/api";
import styles from "./LeaveSummary.module.css";
import Swal from "sweetalert2";

function LeaveSummary() {
  const [leaveHistory, setLeaveHistory] = useState([]);

  const fetchSummary = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await api.get(`/leaves/summary/${userId}`);

      if (res.data.isSuccess) {
        setLeaveHistory(res.data.data);
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Leave Summary</h2>

      {leaveHistory.length === 0 ? (
        <p className={styles.noData}>No leave history found</p>
      ) : (
        leaveHistory.map((leave) => (
          <div key={leave.id} className={styles.card}>

            {/* HEADER */}
            <div className={styles.cardHeader}>
              <span className={styles.leaveType}>{leave.leaveType}</span>
              <span
                className={
                  styles.status +
                  " " +
                  (leave.leaveStatus ? styles[leave.leaveStatus.toLowerCase()] : "")
                }
              >
                {leave.leaveStatus}
              </span>
            </div>

            {/* DETAILS */}
            <div className={styles.infoRow}>
              <span>📅 From:</span>
              <p>{leave.fromDate}</p>
            </div>

            <div className={styles.infoRow}>
              <span>📅 To:</span>
              <p>{leave.toDate}</p>
            </div>

            <div className={styles.infoRow}>
              <span>📝 Reason:</span>
              <p>{leave.reason}</p>
            </div>

            <div className={styles.footer}>
              Applied on {leave.appliedAt}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default LeaveSummary;
