import { BrowserRouter, Routes, Route } from "react-router";
import LoginOrRegister from "./pages/LoginOrRegister";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Offering from "./pages/Offering";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginOrRegister />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="offering" element={<Offering />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="*" element={<LoginOrRegister />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
