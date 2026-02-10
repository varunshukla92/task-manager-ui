import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Tasks Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
