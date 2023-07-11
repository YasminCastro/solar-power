import AuthRoutes from "./auth.routes";
import { useAuth } from "../contexts/auth";
import AppRoutes from "./app.routes";
import LoadingScreen from "../components/global/LoadingScreen";

const Routes: React.FC = () => {
  const { isAuth, loading } = useAuth();

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return isAuth ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
