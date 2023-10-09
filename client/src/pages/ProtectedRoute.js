import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useSelector((state) => state.data);
  if (userLoading) return <Loading />;
  if (!user) {
    return <Navigate to="/register" />;
  }
  return children;
};

export default ProtectedRoute;
