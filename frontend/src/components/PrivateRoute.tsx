import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserInfo } from "../types/users/userTypes";

const PrivateRoute = () => {
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: UserInfo } }) => state.auth
  );
  return userInfo ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
