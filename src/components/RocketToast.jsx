import { useEffect } from "react";
import "./RocketToast.css";

export default function RocketToast({ show, status, onClose, message }) {
  // auto hide after 2.2s
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onClose?.(), 2200);
    return () => clearTimeout(t);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="rocket-overlay">
      <div className={`rocket-wrap ${status === "success" ? "launch" : "crash"}`}>
        {/* simple inline SVG rocket */}
        <svg
          className="rocket-svg"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g>
            <path d="M32 2c10 6 16 18 16 30 0 3-1 6-2 9l-14-7-14 7c-1-3-2-6-2-9 0-12 6-24 16-30z" fill="#ffffff"/>
            <circle cx="32" cy="20" r="6" fill="#6a11cb"/>
            <path d="M18 41l6 9 8-10 8 10 6-9-14-7z" fill="#ffd166"/>
          </g>
        </svg>

        <div className="rocket-trail" />

        <div className={`rocket-msg ${status}`}>
          {message || (status === "success" ? "Success!" : "Oops! Failed")}
        </div>
      </div>
    </div>
  );
}
