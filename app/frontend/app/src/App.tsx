import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./hooks/PrivateRoute";
import Dashbord from "./pages/Dashbord";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/*ROTAS PUBLICAS*/}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/*ROTAS PRIVADAS*/}
          <Route
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/:userId" element={<Dashbord />} />
          </Route>
          {/* Página de erro para rotas inexistentes */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
