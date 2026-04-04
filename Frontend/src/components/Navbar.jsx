import { useNavigate, useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = (() => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch { return null; }
  })();

  const storedUser = (() => {
    try { return JSON.parse(sessionStorage.getItem("user") || "null"); }
    catch { return null; }
  })();

  const displayName = storedUser?.name || "User";
  const role = storedUser?.role || user?.role || "";
  const initial = displayName.charAt(0).toUpperCase();
  const profilePic = storedUser?.profilePicture || null;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = role === "driver"
    ? [{ label: "Dashboard", path: "/driver-dashboard" }]
    : [{ label: "Find Ride", path: "/passenger-dashboard" }];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      height: "64px",
      background: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      display: "flex", alignItems: "center",
      padding: "0 28px",
      justifyContent: "space-between",
      boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
    }}>

      {/* Logo */}
      <Link to="/" style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900, fontSize: "1.35rem",
        letterSpacing: "-0.04em", textDecoration: "none",
        color: "#0f172a",
      }}>
        Cab<span style={{ color: "#6366f1" }}>Share</span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {navLinks.map(({ label, path }) => (
          <Link key={path} to={path} style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600, fontSize: "0.875rem",
            textDecoration: "none", padding: "7px 16px",
            borderRadius: "8px", transition: "all 0.15s",
            color: isActive(path) ? "#6366f1" : "#64748b",
            background: isActive(path) ? "rgba(99,102,241,0.08)" : "transparent",
          }}>
            {label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user ? (
          <>
            {/* ✅ Profile pill — now a clickable Link to /profile */}
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "6px 14px 6px 6px",
                  borderRadius: "100px",
                  background: isActive("/profile") ? "rgba(99,102,241,0.06)" : "#f8fafc",
                  border: isActive("/profile") ? "1px solid rgba(99,102,241,0.3)" : "1px solid #e2e8f0",
                  cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.background = "rgba(99,102,241,0.06)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isActive("/profile") ? "rgba(99,102,241,0.3)" : "#e2e8f0";
                  e.currentTarget.style.background = isActive("/profile") ? "rgba(99,102,241,0.06)" : "#f8fafc";
                }}
              >
                {/* Avatar — shows profile picture if set */}
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 800, fontSize: "0.85rem",
                  fontFamily: "'Inter', sans-serif",
                  flexShrink: 0, overflow: "hidden",
                }}>
                  {profilePic
                    ? <img src={profilePic} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : initial
                  }
                </div>

                <div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700, fontSize: "0.82rem",
                    color: "#0f172a", lineHeight: 1.2,
                  }}>
                    {displayName}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem", color: "#94a3b8",
                    textTransform: "capitalize", lineHeight: 1,
                  }}>
                    {role}
                  </div>
                </div>
              </div>
            </Link>

            {/* Logout */}
            <button onClick={handleLogout} style={{
              padding: "8px 16px", borderRadius: "8px",
              background: "transparent",
              border: "1px solid #e2e8f0",
              color: "#64748b",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: "0.82rem",
              cursor: "pointer", transition: "all 0.15s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#fff1f2";
                e.currentTarget.style.borderColor = "#fca5a5";
                e.currentTarget.style.color = "#ef4444";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.color = "#64748b";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              padding: "8px 18px", borderRadius: "8px",
              border: "1px solid #e2e8f0",
              color: "#0f172a", textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: "0.875rem",
            }}>
              Login
            </Link>
            <Link to="/signup" style={{
              padding: "8px 18px", borderRadius: "8px",
              background: "#6366f1", color: "white",
              textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: "0.875rem",
              boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
            }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;