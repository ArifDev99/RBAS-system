import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { ROUTES } from "./Constant/constant";
import { Login } from "./Pages/Login";
import { UserProvider } from "./Context/userContext";
import PrivateRoute from "./Components/PrivateRoute";
import Home from "./Pages/Home";
import Header from "./Components/Header";
function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path={ROUTES.HOME} element={
            <PrivateRoute allowedRoles={['EMPLOYEE', 'ADMIN','MANAGER','ENGINEER','SPECIALIST']}>
              <Home />
            </PrivateRoute>
            } />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
