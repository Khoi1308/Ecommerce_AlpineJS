import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { VerifyAccount } from "./pages/verifyAccount";
import { ForgorPassword } from "./pages/forgotPassword";
import { ResetPassword } from "./pages/resetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/email/verify/:code" element={<VerifyAccount />} />
          <Route path="/auth/password/forgot" element={<ForgorPassword />} />
          <Route path="/auth/password/reset" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
