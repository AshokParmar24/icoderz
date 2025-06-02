import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import DashboardPage from "../pages/Dashboard/index";
import LoginPage from "../pages/Login/index";
import Authentication from "../middlewares/Authentication";
import RegisterPage from "../pages/Register";
import CreateProductPage from "../pages/CreateProduct";

const AppRoutes = () => {
  const isAuthenticated = useSelector(
    (state) => state?.authReducer?.isAuthenticated || false
  );
  return (
    <Router>
      <Routes>
        <Route element={<Authentication />}>
          {/* <Route path="/dashboard" element={<DashboardPage />} /> api working login that time uncomment 
          <Route path="/new-product" element={<CreateProductPage />} />{" "}
          <Route path="/edit-product/:id" element={<CreateProductPage />} />{" "} */}
        </Route>
        {!isAuthenticated && (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        {/* not working that time  */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/new-product" element={<CreateProductPage />} />{" "}
        <Route path="/edit-product/:id" element={<CreateProductPage />} />{" "}
        {/* <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />}
        /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
