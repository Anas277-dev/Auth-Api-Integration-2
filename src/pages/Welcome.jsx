import { useEffect, useState } from "react";
import { getToken, removeToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
      return;
    }

    const decoded = jwtDecode(token);
    setUserData(decoded);
  }, [navigate]);

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  if (!userData) return null;

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome!</h1>
        <p><strong>User ID:</strong> {userData.userId}</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
