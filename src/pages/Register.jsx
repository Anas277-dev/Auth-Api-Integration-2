import { useState } from "react";
import "./Login.css"; // custom CSS import
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://os-project-server.vercel.app/auth/newuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("✅ User registered successfully! You can now login.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign-Up</h2>
        <p className="subtitle">Create your account</p>
        {message && <p className="message">{message}</p>}
        
        <form className="login-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit" className="btn-primary">SignUp</button>
          </form>
          <div className="divider"></div>

          <div className="social-login">
          <button className="google-btn"><Link to="https://github.com/Anas277-dev?tab=repositories" className="link">Github</Link></button>
          <button className="github-btn">Linked-in</button>
        </div>

        <p className="signup-text">
          I have an account? <Link to="/" className="link">Login</Link>
        </p>
        
      </div>
    </div>
  );
}
