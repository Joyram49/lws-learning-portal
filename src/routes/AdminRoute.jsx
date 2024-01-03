import useAuth from "../hooks/useAuth";
import AccessDenied from "../pages/AccessDenied";

export default function AdminRoute({ role, children }) {
  const auth = useAuth();
  let isAdmin = auth?.user?.role === role;

  return isAdmin ? children : <AccessDenied />;
}
