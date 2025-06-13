// src/components/ProtectedRoute.tsx
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/profile");
        console.log("✅ User Profile:", res.data.user); // You can set this to global state if needed
        setIsAuthenticated(true);
      } catch (error) {
        console.error("⛔ Not Authenticated:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
