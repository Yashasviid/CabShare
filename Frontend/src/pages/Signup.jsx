import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

const EyeIcon = ({ open }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", phone: "", gender: "", password: "" });
  const [nameError, setNameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loadingRole, setLoadingRole] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const isStrongPassword = (p) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(p);
  const passwordChecks = {
    length:    formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number:    /\d/.test(formData.password),
    special:   /[@$!%*?&]/.test(formData.password),
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (/\d/.test(val)) {
      setNameError("Name cannot contain numbers");
    } else {
      setNameError("");
    }
    setFormData({ ...formData, name: val.replace(/\d/g, "") });
  };

  const sendOTP = async (selectedRole) => {
    if (!formData.name || !formData.phone || !formData.gender || !formData.password) { alert("Please fill all details"); return; }
    if (formData.phone.length !== 10) { alert("Enter valid 10-digit phone number"); return; }
    if (!isStrongPassword(formData.password)) { alert("Password is not strong enough"); return; }
    setLoadingRole(selectedRole);
    setRole(selectedRole);
    try {
      await API.post("/auth/send-otp", { phone: "+91" + formData.phone });
      setStep(2);
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    } finally { setLoadingRole(null); }
  };

  const verifyOTPAndRegister = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) { alert("Enter complete OTP"); return; }
    setVerifying(true);
    try {
      await API.post("/auth/verify-otp", { phone: "+91" + formData.phone, otp: otpCode });
      const res = await API.post("/auth/register", { ...formData, phone: "+91" + formData.phone, role });
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      if (role === "driver") navigate("/driver-details");
      else navigate("/passenger-dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    } finally { setVerifying(false); }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      document.getElementById(`otp-${index - 1}`)?.focus();
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div id="recaptcha-container" />
      <div className="fade-up" style={{ maxWidth: "420px", width: "100%" }}>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <a href="/" style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "2rem", color: "#0f172a", textDecoration: "none", letterSpacing: "-0.04em" }}>
            Cab<span style={{ color: "#6366f1" }}>Share</span>
          </a>
          <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "6px" }}>
            {step === 1 ? "Join the Network" : "Verify your number"}
          </p>
        </div>

        <div className="glass-card" style={{ padding: "2.5rem" }}>

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

              {/* Name */}
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleNameChange}
                />
                {nameError && (
                  <p style={{ color: "red", fontSize: "12px", marginTop: "6px" }}>
                    {nameError}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label>Phone Number</label>
                <input type="tel" className="input-field" placeholder="10-digit number" maxLength={10}
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })} />
              </div>

              {/* Password with eye toggle */}
              <div>
                <label>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input-field"
                    placeholder="Min 8 characters"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    onBlur={() => setShowPasswordError(true)}
                    style={{ paddingRight: "44px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", padding: "4px" }}>
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                {showPasswordError && formData.password && !isStrongPassword(formData.password) && (
                  <p style={{ color: "red", fontSize: "12px", marginTop: "6px" }}>
                    {!passwordChecks.length    ? "At least 8 characters" :
                     !passwordChecks.uppercase ? "Add an uppercase letter" :
                     !passwordChecks.lowercase ? "Add a lowercase letter" :
                     !passwordChecks.number    ? "Add a number" :
                     !passwordChecks.special   ? "Add a special character (@$!%*?&)" : ""}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "7px", textTransform: "uppercase" }}>Gender</label>
                <select className="input-field" value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <hr className="divider" />
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", marginBottom: "0.5rem" }}>I want to</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { label: "Offer a Ride", thisRole: "driver" },
                  { label: "Find a Ride",  thisRole: "passenger" },
                ].map(({ label, thisRole }) => (
                  <button key={thisRole} onClick={() => sendOTP(thisRole)} disabled={loadingRole !== null}
                    style={{ padding: "1rem", borderRadius: "var(--radius)", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem", cursor: loadingRole !== null ? "not-allowed" : "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { if (!loadingRole) e.currentTarget.style.background = "rgba(99,102,241,0.12)"; }}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(99,102,241,0.06)"}>
                    {loadingRole === thisRole ? "Sending OTP..." : label}
                  </button>
                ))}
              </div>

              <hr className="divider" />
              <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 700 }}>Sign in</Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem", fontSize: "0.75rem", color: "var(--primary)", fontWeight: 800, letterSpacing: "0.05em" }}>SMS</div>
                <p style={{ color: "var(--text)", fontWeight: 700, fontSize: "1rem" }}>OTP sent to +91 {formData.phone}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "4px" }}>Enter the 6-digit code from your SMS</p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {otp.map((digit, i) => (
                  <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    style={{ width: "46px", height: "56px", textAlign: "center", fontSize: "1.4rem", fontWeight: 800, borderRadius: "var(--radius)", border: digit ? "2px solid var(--primary)" : "1px solid var(--border)", background: digit ? "rgba(99,102,241,0.06)" : "var(--input-bg)", color: "var(--text)", outline: "none", transition: "all 0.15s" }}
                  />
                ))}
              </div>
              <button onClick={verifyOTPAndRegister} disabled={verifying} className="btn-primary" style={{ width: "100%" }}>
                {verifying
                  ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}><span className="spinner" /> Verifying...</span>
                  : "Verify & Create Account"}
              </button>
              <button onClick={() => { setStep(1); setOtp(["","","","","",""]); }}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.85rem", textDecoration: "underline" }}>
                Change number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;