// frontend/src/hooks/useAuth.jsx

import { useState, useEffect, useCallback } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
} from "../api/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Fetch current user
  const fetchUser = useCallback(async () => {
    setAuthLoading(true);
    const res = await getCurrentUser();
    console.log("Current user data on useAuth:", res);
    
    if (res.success) {
      setUser(res.data.data.user);
    } else {
      setUser(null);
    }
    setAuthLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Login handler
  const login = async (credentials) => {
    const res = await loginUser(credentials);
    console.log("Login response on useAuth:", res);
    
    if (res.success) {
      localStorage.setItem("authToken", res.data.data.token);
      setUser(res);
    }
    return res;
  };

  // Register handler
  const register = async (formData) => {
    const res = await registerUser(formData);
    console.log("Register response on useAuth:", res);
    
    if (res.success) {
      localStorage.setItem("authToken", res.data.token);
      setUser(res.data.user);
    }
    return res;
  };

  // Logout handler
  const logout = async () => {
    await logoutUser();
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    authLoading,
    login,
    register,
    logout,
    refetchUser: fetchUser,
  };
};