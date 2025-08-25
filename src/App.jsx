import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTaskTab from "./components/AddTaskTab";
import HomeTab from "./components/HomeTab";

function SettingsTab() {
  return <h1 className="text-xl font-bold">⚙️ Coming Soon...</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Nested Tabs */}
            <Route path="home" element={<HomeTab />} />
            <Route path="add-task" element={<AddTaskTab />} />
            <Route path="settings" element={<SettingsTab />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
 