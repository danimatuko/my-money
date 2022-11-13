import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoutes = () => {
  console.log("PrivateRoutes");

  let { user } = useAuthContext();
  console.log(user);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
