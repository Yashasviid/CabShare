// src/pages/DriverHistory.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const statusColor = (s) => {
  if (s === "completed") return { bg: "rgba(22,163,74,0.1)", color: "#16a34a", border: "rgba(22,163,74,0.25)" };
  if (s === "cancelled") return { bg: "rgba(239,68,68,0.08)", color: "#ef4444", border: "rgba(239,68,68,0.2)" };
  return { bg: "rgba(99,102,241,0.08)", color: "var(--primary)", border: "rgba(99,102,241,0.2)" };
};

const DriverHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/bookings/history/driver");
        setHistory(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Header */}
        <div className="fade-up" style={{ paddingTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span className="chip" style={{ marginBottom: "12px", display: "inline-flex" }}><span className="chip-dot" />Driver Console</span>
            <h1 style={{ fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.02em", color: "var(--text)" }}>Ride History</h1>
            <p style={{ color: "var(--text-muted)", marginTop: "5px", fontStyle: "italic", fontSize: "0.9rem" }}>All your completed and cancelled rides</p>
          </div>
          <button onClick={() => navigate("/driver-dashboard")}
            style={{ padding: "9px 20px", borderRadius: "8px", background: "transparent", border: "1px solid rgba(99,102,241,0.25)", color: "var(--text-muted)", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
            ← Back to Dashboard
          </button>
        </div>

        {/* List */}
        <div className="fade-up">
          {loading ? (
            <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
              <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Loading history…</p>
            </div>
          ) : history.length === 0 ? (
            <div className="glass-card" style={{ padding: "4rem 2rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📋</div>
              <p style={{ color: "var(--text)", fontWeight: 700 }}>No ride history yet</p>
              <p style={{ color: "var(--text-muted)", fontStyle: "italic", marginTop: "5px" }}>Completed and cancelled rides will appear here</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {history.map(ride => {
                const sc = statusColor(ride.status);
                return (
                  <div key={ride._id} className="glass-card" style={{ padding: "1.4rem 1.6rem" }}>
                    {/* Route row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontWeight: 700, color: "var(--text)", fontSize: "1rem" }}>{ride.source}</span>
                        <svg width="16" height="10" fill="none" viewBox="0 0 16 10"><path d="M1 5h14M9 1l6 4-6 4" stroke="var(--primary,#6366f1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontWeight: 700, color: "var(--text)", fontSize: "1rem" }}>{ride.destination}</span>
                      </div>
                      <span style={{ padding: "4px 12px", borderRadius: "100px", fontSize: "0.72rem", fontWeight: 600, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, textTransform: "capitalize" }}>
                        {ride.status}
                      </span>
                    </div>

                    {/* Meta */}
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: ride.passengers?.length ? "12px" : 0 }}>
                      {ride.fare && <span>₹{ride.fare}/seat</span>}
                      <span>{new Date(ride.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span>{ride.passengers?.length || 0} passenger{ride.passengers?.length !== 1 ? "s" : ""}</span>
                    </div>

                    {/* Passengers */}
                    {ride.passengers?.length > 0 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {ride.passengers.map(b => (
                          <div key={b._id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.1)", flexWrap: "wrap", gap: "8px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>👤</div>
                              <div>
                                <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.85rem" }}>{b.passengerId?.name || "Passenger"}</div>
                                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                                  {b.passengerId?.gender || ""}
                                  {b.seatsBooked && `  ·  ${b.seatsBooked} seat${b.seatsBooked !== 1 ? "s" : ""}`}
                                </div>
                              </div>
                            </div>
                            {b.passengerId?.phone && (
                              <a href={`tel:${b.passengerId.phone}`}
                                style={{ padding: "5px 12px", borderRadius: "6px", background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)", color: "#16a34a", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                                📞 {b.passengerId.phone}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverHistory;