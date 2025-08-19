import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { saveToken } from "../utils/auth";
import "./Login.css"; 
import RocketToast from "../components/RocketToast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [rocket, setRocket] = useState({ show: false, status: "success", message: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://os-project-server.vercel.app/auth/existinguser",
        {
          username: username.trim(),
          password: password.trim(),
        }
      );
      saveToken(res.data.token);
      setRocket({ show: true, status: "success", message: "Logged in!" });
      setTimeout(() => navigate("/welcome"), 900);
    } catch (err) {
      setRocket({
        show: true,
        status: "error",
        message: err.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your account</p>
      <form className="login-form" onSubmit={handleLogin}>
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="options">
            
            <Link to="/forgot-password" className="link">Forgot Password?</Link>
              
          </div>

        <button type="submit" className="btn-primary">LOGIN</button>
      </form>
      <div className="divider"></div>
      <div className="social-login">
          <button className="google-btn"><Link to="https://github.com/Anas277-dev?tab=repositories" className="link">Github</Link></button>
          <button className="github-btn">Linked-in</button>
        </div>
        <p className="signup-text">
          Don’t have an account? <Link to="/register" className="link">Sign up</Link>
        </p>
        <RocketToast
          show={rocket.show}
          status={rocket.status}
          message={rocket.message}
          onClose={() => setRocket((r) => ({ ...r, show: false }))}
        />
      </div>
    </div>
  );
};

export default Login;
