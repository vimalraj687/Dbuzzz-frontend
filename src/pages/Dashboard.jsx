import React, { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Home, PlusSquare, Settings, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";

const Dashboard = () => {
   const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth); // 👈 Redux se user

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/home", { replace: true });
    }
  }, [location, navigate]);

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/dashboard/home" },
    { name: "Add Task", icon: <PlusSquare size={20} />, path: "/dashboard/add-task" },
    { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/"); // login page pe bhej do
  };

  return (
    <div className="grid min-h-screen bg-gray-100 md:grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="bg-indigo-600 text-white flex flex-col p-4 md:p-6 
                        md:static fixed bottom-0 left-0 right-0 z-50 md:h-auto">
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold mb-8">TaskApp</h1>
        </div>

        <ul className="flex md:flex-col justify-around md:space-y-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 md:gap-3 cursor-pointer px-3 py-2 rounded-lg transition 
                ${location.pathname === item.path ? "bg-indigo-500" : "hover:bg-indigo-500"}`}
            >
              {item.icon}
              <span className="hidden md:inline">{item.name}</span>
            </li>
          ))}
        </ul>

         
        <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 mt-6 rounded-lg font-semibold transition"
>
  <LogOut size={18} /> Logout
</button>
      </aside>

      <main className="p-4 md:p-8">
        <header className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold">Dashboard</h2>
          <span className="bg-indigo-100 text-indigo-600 px-3 py-1 md:px-4 md:py-2 rounded-lg font-semibold text-sm md:text-base">
            Welcome, {user?.name || "User"} 👋
          </span>
        </header>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
