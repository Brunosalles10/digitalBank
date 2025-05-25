import { Toaster } from "react-hot-toast";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./hooks/PrivateRoute";
import AccountPages from "./pages/accountPages/Account";
import AccountSettingsPage from "./pages/accountPages/AccountSettingsPage";
import DepositPage from "./pages/accountPages/DepositPage";
import PaymentPage from "./pages/accountPages/PaymentPage";
import TransferPage from "./pages/accountPages/TransferPage";
import ChangePassword from "./pages/ChangePassword";
import Dashbord from "./pages/Dashbord";
import EditProfile from "./pages/EditProfile";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TransactionsPage from "./pages/transaction/TransactionsPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
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
            <Route path="/editprofile/:userId" element={<EditProfile />} />
            <Route path="/accounts/user/:userId" element={<AccountPages />} />
            <Route path="/accounts/deposit/:userId" element={<DepositPage />} />
            <Route
              path="/accounts/transactions/:userId"
              element={<TransactionsPage />}
            />
            <Route
              path="/accounts/transfer/:userId"
              element={<TransferPage />}
            />
            <Route path="/accounts/payment/:userId" element={<PaymentPage />} />
            <Route
              path="/accounts/settings/:userId"
              element={<AccountSettingsPage />}
            />

            {/* Rota para alterar senha */}
            <Route
              path="/changepassword/:userId"
              element={<ChangePassword />}
            />
          </Route>
          {/* Página de erro para rotas inexistentes */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
