import { Outlet } from "react-router"; // Importing Outlet to render nested routes
import Nav from "./Header/Nav"; // Importing the Nav component for the navigation bar

// Layout component that wraps around page content and includes the navigation bar
const Layout = () => (
  <div className="container min-h-dvh py-4"> {/* A container with a minimum height and padding */}
    <Nav /> {/* Rendering the Nav component */}
    <Outlet /> {/* Rendering the nested routes/components here */}
  </div>
);

export default Layout; // Exporting the Layout component for use in routing
