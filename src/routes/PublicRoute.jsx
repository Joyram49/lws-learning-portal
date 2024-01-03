import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const auth = useAuth();

  if (!auth?.accessToken || !auth?.user) {
    return children;
  } else {
    if (auth?.user?.role === "admin") {
      return <Navigate to='/admin/dashboard' />;
    } else {
      return <Navigate to='/courseplayer' />;
    }
  }
}
