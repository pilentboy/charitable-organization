import { Outlet } from "react-router"; // Importing Outlet to render nested routes
import Nav from "./Header/Nav"; // Importing the Nav component for the navigation bar
import Footer from "./Footer/Footer";

// Layout component that wraps around page content and includes the navigation bar
const Layout = () => (
  <div className="container min-h-dvh py-4 flex flex-col justify-between relative">
    {/* A container with a minimum height and padding */}
    <Nav /> {/* Rendering the Nav component */}
    <Outlet /> {/* Rendering the nested routes/components here */}
    <Footer />
  </div>
);

export default Layout; // Exporting the Layout component for use in routing
