import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "../pages/Login";
import Tasks from "../pages/Tasks";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

       <nav style={{ marginBottom: "20px" }}>
        <Link to="/login" style={{ marginRight: "10px" }}>
          Login
        </Link>
        <Link to="/tasks">Tasks</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/tasks"
          element={
          <ProtectedRoute>
          <Tasks/>
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
