import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashbord from "./pages/Dashbord";
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
          <Route path="/dashboard" element={<Dashbord />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
