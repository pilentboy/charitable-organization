import { BrowserRouter, Routes, Route } from "react-router";
// Importing necessary components and modules from react-router

import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// Importing the pages that will be used in the routes

import { AuthProvider } from "./context/AuthProvider";
// Importing AuthProvider for context

import ProtectedRoute from "./components/ProtectedRoute";
// Importing ProtectedRoute component to secure certain routes

import Layout from "./components/Layout";
// Importing Layout component for the overall structure of the app

import LoginOTP from "./pages/LoginOTP";
import ResetPassword from "./pages/ResetPassword";
// Importing additional pages for login with OTP and resetting password

const App = () => {
  return (
    <BrowserRouter>
      {/* Wrapping the application with BrowserRouter */}
      <AuthProvider>
          {/* Providing authentication context to the entire application */}
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Layout component acts as a wrapper for nested routes */}
              <Route index element={<Home />} />
              {/* Home page route */}

              <Route path="profile" element={<ProtectedRoute />}>
                {/* Protected route for profile, requiring authentication */}
                <Route index element={<Profile />} />
              </Route>

              <Route path="login" element={<Login />} />
              {/* Route for login page */}

              <Route path="login-otp" element={<LoginOTP />} />
              {/* Route for login with OTP page */}

              <Route path="reset-password" element={<ResetPassword />} />
              {/* Route for reset password page */}

              <Route path="register" element={<Register />} />
              {/* Route for registration page */}

              <Route path="about-us" element={<AboutUs />} />
              {/* Route for about us page */}

              <Route path="contact-us" element={<ContactUs />} />
              {/* Route for contact us page */}

              <Route path="*" element={<Home />} />
              {/* Catch-all route that redirects to home page */}
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
// Exporting the App component as default export
