import { BrowserRouter, Routes, Route } from "react-router";
import LoginOrRegister from "./pages/LoginOrRegister";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Offering from "./pages/Offering";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<LoginOrRegister />} />

          <Route path="offering" element={<ProtectedRoute />}>
            <Route index element={<Offering />} />
          </Route>

          <Route path="profile" element={<ProtectedRoute />}>
            <Route index element={<Profile />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="*" element={<LoginOrRegister />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
