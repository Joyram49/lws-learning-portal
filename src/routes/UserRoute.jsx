import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminRoute({ role, children }) {
  const auth = useAuth();
  let isStudent = auth?.user?.role === role;

  return isStudent ? children : <Navigate to='/' />;
}
