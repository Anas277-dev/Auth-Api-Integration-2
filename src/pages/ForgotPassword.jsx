import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; 

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = send otp, 2 = reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://os-project-server.vercel.app/auth/send-otp", {
        email,
      });
      setMessage("✅ OTP sent to your email!");
      setStep(2);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Failed to send OTP"));
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://os-project-server.vercel.app/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMessage("✅ Password reset successful! You can now login.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Failed to reset password"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Forgot Password</h2>
        {message && <p className="message">{message}</p>}

        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Send OTP</button>
            
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}
