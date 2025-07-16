// frontend/src/pages/Dashboard.jsx

import { useAuth } from "../hooks/useAuth";
import { LogOut, User, ShieldCheck, HeartPulse, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log("Dashboard user data:", user);
  

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    document.title = `Dashboard | GetMax`;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 px-6 py-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <HeartPulse className="text-blue-600" size={32} />
          GetMax Dashboard
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all flex items-center gap-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="bg-white rounded-3xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-blue-200 to-blue-400 p-6 rounded-2xl shadow-lg text-white">
          <div className="text-xl font-semibold mb-2 flex items-center gap-2">
            <User size={22} /> Welcome, {user?.firstName}!
          </div>
          <p className="text-sm">
            You’re logged in as <strong>{user?.email}</strong>
          </p>
        </div>

        <div className="bg-gradient-to-br from-teal-200 to-teal-400 p-6 rounded-2xl shadow-lg text-white">
          <div className="text-xl font-semibold mb-2 flex items-center gap-2">
            <ShieldCheck size={22} /> Status
          </div>
          <p className="text-sm">
            Email Verified:{" "}
            <strong>{user?.isEmailVerified ? "Yes" : "No"}</strong>
            <br />
            Role: <strong>{user?.role}</strong>
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-200 to-indigo-400 p-6 rounded-2xl shadow-lg text-white">
          <div className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Activity size={22} /> Activity
          </div>
          <p className="text-sm">
            Last Login:{" "}
            <strong>{new Date(user?.lastLogin).toLocaleString()}</strong>
            <br />
            Registered On:{" "}
            <strong>{new Date(user?.createdAt).toLocaleDateString()}</strong>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} GetMax Healthcare. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
