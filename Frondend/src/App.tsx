import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { VerifyAccount } from "./pages/verifyAccount";
import { ForgorPassword } from "./pages/forgotPassword";
import { ResetPassword } from "./pages/resetPassword";
import { UserProfile } from "./pages/user/profile";
import { ProductCard } from "./pages/product/product_card";
import { Header } from "./components/header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/email/verify/:code" element={<VerifyAccount />} />
          <Route path="/auth/password/forgot" element={<ForgorPassword />} />
          <Route path="/auth/password/reset" element={<ResetPassword />} />
          <Route path="/product" element={<ProductCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
