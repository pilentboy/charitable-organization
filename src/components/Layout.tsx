import { Outlet } from "react-router";
import Nav from "./Nav/Nav";

const   Layout = () => (
  <div className="container  min-h-dvh py-4 ">
    <Nav />
    <Outlet />
  </div>
);

export default Layout;
