import React, { useEffect, useState, useCallback } from "react";
import api from "../../Services/api";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./AdminAttendence.module.css";

const localizer = momentLocalizer(moment);

export default function AdminAttendence() {
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [visibleDate, setVisibleDate] = useState(new Date());

  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth() + 1;

  // 🔹 Fetch employees
  useEffect(() => {
    api
      .get("/users/allUsers")
      .then((res) => setEmployeeList(res.data.users || []))
      .catch(() => setEmployeeList([]));
  }, []);

  // 🔹 Fetch attendance for selected employee + month
  const fetchAttendance = useCallback(async () => {
    if (!employeeId) return;
    try {
      const res = await api.get("/attendence/admin/fetchAll", {
        params: { employeeId, year, month },
      });

      if (res.data?.isSuccess) {
        const formatted = res.data.data.map((a) => ({
          id: a.id,
          title: a.status,
          dateStr: a.date,
          loginTime: a.loginTime,
          logoutTime: a.logoutTime,
          start: moment(a.date, "DD-MM-YYYY").toDate(),
          end: moment(a.date, "DD-MM-YYYY").toDate(),
        }));
        setEvents(formatted);
        const today = moment().format("DD-MM-YYYY");
        setSelectedDetail(formatted.find((d) => d.dateStr === today) || null);
      } else {
        setEvents([]);
        setSelectedDetail(null);
      }
    } catch {
      setEvents([]);
      setSelectedDetail(null);
    }
  }, [employeeId, year, month]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  // 🔹 Calendar styling
 const eventStyleGetter = (event) => ({
  style: {
    backgroundColor: event.title === "P" ? "#000" : "#ffbfbf",
    border: "1px solid #888",
    borderRadius: "0px",
    color: "#000",
    fontWeight: "600",
    width: "100%",
    height: "100%",
  },
});

const dayPropGetter = (date) => {
  const dayStr = moment(date).format("DD-MM-YYYY");
  const match = events.find((e) => e.dateStr === dayStr);

  return {
    className: styles.hoverDayCell, // ✔ Correct way for CSS Modules
    style: match
      ? {
          backgroundColor: match.title === "P" ? "#c7f7c1" : "#ffbfbf",
          border: "1px solid #777",
        }
      : {},
  };
};




  // 🔹 Navigation (prev/next month)
  const handleNavigate = (newDate) => {
    setVisibleDate(newDate);
  };

  return (
    <div className={styles.attendance}>
      {/* Header */}
      <h2 className={styles.heading}>Attendance Dashboard</h2>

      {/* Employee dropdown */}
      {/* Filter Bar */}
<div className={styles.filterBar}>
  {/* Employee dropdown (big size) */}
  <select
    className={styles.bigSelect}
    value={employeeId}
    onChange={(e) => setEmployeeId(e.target.value)}
  >
    <option value="">— Select Employee —</option>
    {employeeList.map((emp) => (
      <option key={emp.id} value={emp.id}>
        {emp.username} ({emp.role})
      </option>
    ))}
  </select>

  {/* Month dropdown */}
  <select
    className={styles.smallSelect}
    value={month}
    onChange={(e) =>
      setVisibleDate(moment(visibleDate).month(Number(e.target.value) - 1).toDate())
    }
  >
    {Array.from({ length: 12 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {moment().month(i).format("MMMM")}
      </option>
    ))}
  </select>

  {/* Year dropdown */}
  <select
    className={styles.smallSelect}
    value={year}
    onChange={(e) =>
      setVisibleDate(moment(visibleDate).year(Number(e.target.value)).toDate())
    }
  >
    {Array.from({ length: 6 }, (_, i) => year - 3 + i).map((yr) => (
      <option key={yr} value={yr}>
        {yr}
      </option>
    ))}
  </select>
</div>


      {/* Main Content */}
      <div className={styles.body}>
        {/* Calendar */}
        <div className={styles.left}>
          {!employeeId ? (
            <div className={styles.blank}>Please select employee</div>
          ) : (
    <Calendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  views={["month"]}
  selectable
  date={visibleDate}
  onNavigate={handleNavigate}
  onSelectEvent={(e) => setSelectedDetail(e)}
  onSelectSlot={(slot) => {
    const dateStr = moment(slot.start).format("DD-MM-YYYY");
    const match = events.find((e) => e.dateStr === dateStr);
    setSelectedDetail(match || null);
  }}
  dayPropGetter={dayPropGetter}
  eventPropGetter={() => ({ style: { display: "none" } })}
  components={{
    dateHeader: ({ label, date }) => {
      const dayStr = moment(date).format("DD-MM-YYYY");
      const match = events.find((e) => e.dateStr === dayStr);

      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#000",
            pointerEvents: "none", // 👈 click goes to the cell
          }}
        >
          {match ? match.title : label}
        </div>
      );
    }
  }}
  style={{ height: "78vh" }}
/>



          )}
        </div>

        {/* Right Side Details */}
        <div className={styles.right}>
          {!employeeId ? (
            <p>Select employee to view details</p>
          ) : selectedDetail ? (
            <>
              <h3>Day Summary</h3>
              <p><strong>Date:</strong> {selectedDetail.dateStr}</p>
              <p><strong>Status:</strong> {selectedDetail.title === "P" ? "Present" : "Absent"}</p>
              <p><strong>Login:</strong> {selectedDetail.loginTime || "--"}</p>
              <p><strong>Logout:</strong> {selectedDetail.logoutTime || "--"}</p>
            </>
          ) : (
            <p>No Data</p>
          )}
        </div>
      </div>
    </div>
  );
}
