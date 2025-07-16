// frontend/src/components/DashboardLayout.jsx

import { Outlet, NavLink } from "react-router-dom";
import { LogOut, Home, User, Shield, LayoutDashboard } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Main Content */}
      <main className="flex-1 p-8">

        <div className="bg-white rounded-2xl shadow p-6 min-h-[400px]">
            <Navbar />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
