import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContexts";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  //   const navigate = useNavigate();
  if (!isAuthenticated) return <Navigate to="/" />;

  //   useEffect(() => {
  //     if (!isAuthenticated) navigate("/");
  //   }, [isAuthenticated, navigate]);

  return children;
}
