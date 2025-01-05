import { Outlet, Link } from "react-router";
import { FaRegUser } from "react-icons/fa";

const Nav = () => {
  return (
    <>
      <nav className="absolute top-4 left-1/2 translate-x-[-50%] w-[90%]  md:w-[700px] bg-white z-50 border nav-shadow h-20 rounded-2xl flex  p-4 items-center justify-between">
        <ul className="flex items-center justify-center text-black gap-2">
          <FaRegUser color="gray" />
          <li>
            <Link to="login" className="hover:text-gray-500">
              ورود
            </Link>
          </li>
          |
          <li>
            <Link to="register" className="hover:text-gray-500">
              ثبت نام
            </Link>
          </li>
        </ul>
        <Link to="/" className="hover:text-gray-500">
          لوگو
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
