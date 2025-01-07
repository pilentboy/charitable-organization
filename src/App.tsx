import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import LoginOTP from "./pages/LoginOTP";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<ProtectedRoute />}>
              <Route index element={<Profile />} />
            </Route>
            <Route path="login" element={<Login />} />

            <Route path="login-otp" element={<LoginOTP />} />

            <Route path="reset-password" element={<ResetPassword />} />

            <Route path="register" element={<Register />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
