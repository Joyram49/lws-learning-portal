import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const auth = useAuth();

  if (auth?.accessToken && auth?.user) {
    return children;
  } else {
    return <Navigate to='/' />;
  }
}
