import { Outlet, Link, NavLink, useLocation } from "react-router";
import { FaRegUser } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

const Nav = () => {
  const [displayMobileNav, setDisplayMobileNav] = useState<boolean>(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node)
      ) {
        setDisplayMobileNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDisplayMobileNav(false)
  }, [location]);

  return (
    <>
      <nav className="w-[90%] absolute top-4 left-1/2 translate-x-[-50%] bg-white z-50 border nav-shadow h-20 rounded-2xl flex  p-4 items-center justify-between text-base">
        <ul className="hidden sm:flex items-center  justify-center text-black gap-5">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-[#007F3D]"
                  : "flex items-center gap-1 hover:text-[#007F3D]"
              }
            >
              <FaRegHeart />
              کمک به شعف
            </NavLink>
          </li>

          <li>
            <NavLink
              to="contact-us"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-[#007F3D]"
                  : "flex items-center gap-1 hover:text-[#007F3D]"
              }
            >
              <CiLocationOn />
              ارتباط با ما
            </NavLink>
          </li>

          <li>
            <NavLink
              to="about-us"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-[#007F3D]"
                  : "flex items-center gap-1 hover:text-[#007F3D]"
              }
            >
              <FaPeopleGroup />
              درباره ما
            </NavLink>
          </li>
        </ul>

        <FiMenu
          className="block sm:hidden text-2xl cursor-pointer hover:text-[#007F3D]"
          onClick={() => setDisplayMobileNav((pre: boolean) => !pre)}
        />

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
      </nav>

      {/* display nav in small screens */}
      <div
        ref={mobileNavRef}
        className={`flex items-center flex-col justify-start py-10 px-4 sm:hidden absolute right-0 top-0 w-[300px] h-[500px] bg-white z-[60] duration-500 gap-5 border-l border-b ${
          displayMobileNav ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <span>لوگو</span>
        <ul className="flex flex-col border-t py-4 items-center w-full h-full gap-10 text-black">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-[#007F3D]"
                  : "flex items-center gap-1 hover:text-[#007F3D]"
              }
            >
              <FaRegHeart />
              کمک به شعف
            </NavLink>
          </li>

          <li>
            <NavLink
              to="contact-us"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-[#007F3D]"
                  : "flex items-center gap-1 hover:text-[#007F3D]"
              }
            >
              <CiLocationOn />
              ارتباط با ما
            </NavLink>
          </li>

          <li>
            <NavLink
              to="about-us"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-[#007F3D]"
                  : "flex items-center gap-1 hover:text-[#007F3D]"
              }
            >
              <FaPeopleGroup />
              درباره ما
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
