import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Container from "./components/Container";
import LoginOTP from "./pages/LoginOTP";
import Nav from "./components/Nav/Nav";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Nav />}>
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
    </Container>
  );
};

export default App;
