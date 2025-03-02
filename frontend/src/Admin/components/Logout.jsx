import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Remove authentication token and user data
    localStorage.removeItem("token");  // Remove JWT token
    localStorage.removeItem("user");   // Remove user details

    // ✅ Redirect to login page
    navigate("/admin");

    // ✅ Optional: Reload page to clear any cached data
    window.location.reload();
  }, [navigate]);

  return null; // No UI needed
}
