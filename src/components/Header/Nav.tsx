import { Link, NavLink, useLocation } from "react-router";
import { FaRegUser } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import useAuth from "../../context/AuthProvider";
import Logo from "../Logo";

const Nav = () => {
  const [displayMobileNav, setDisplayMobileNav] = useState<boolean>(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { loggedIn, profileInfo } = useAuth();
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
    setDisplayMobileNav(false);
  }, [location]);

  return (
    <>
      <nav className="w-full mb-5 h-20  bg-white z-50  nav-shadow   sm:h-24 rounded-3xl flex  p-4 items-center justify-between text-base overflow-hidden">
        <div className="flex items-center gap-1">
          <Logo />

          <FiMenu
            className="block sm:hidden text-2xl cursor-pointer hover:text-primary"
            onClick={() => setDisplayMobileNav((pre: boolean) => !pre)}
          />
        </div>

        <ul className="hidden sm:flex items-center  justify-center text-black gap-5">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-primary"
                  : "flex items-center gap-1 hover:text-primary"
              }
            >
              <FaRegHeart />
              نذر آنلاین
            </NavLink>
          </li>

          <li>
            <NavLink
              to="contact-us"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-primary"
                  : "flex items-center gap-1 hover:text-primary"
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
                  ? "flex items-center gap-1 text-primary"
                  : "flex items-center gap-1 hover:text-primary"
              }
            >
              <FaPeopleGroup />
              درباره ما
            </NavLink>
          </li>
        </ul>

        <ul className="flex items-center justify-center text-black gap-2">
          <FaRegUser color="gray" />
          {loggedIn ? (
            <li>
              <Link
                to="profile"
                className="duration-200 hover:text-primary flex items-center gap-1"
              >
                <span>{profileInfo.first_name}</span>
                <span>{profileInfo.last_name}</span>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="login" className="duration-200 hover:text-primary">
                  ورود
                </Link>
              </li>
              |
              <li>
                <Link to="register" className="duration-200 hover:text-primary">
                  عضویت
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* display nav in small screens */}
      <div
        ref={mobileNavRef}
        className={`flex items-center flex-col justify-start py-10 px-4 sm:hidden absolute right-0 top-0  bg-white w-[300px] h-[500px]  z-[1000] duration-500 gap-5 border-l border-b ${
          displayMobileNav ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <ul className="flex flex-col border-t py-4 items-center w-full h-full gap-10 text-black">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-primary"
                  : "flex items-center gap-1 hover:text-primary"
              }
            >
              <FaRegHeart />
              نذر آنلاین
            </NavLink>
          </li>

          <li>
            <NavLink
              to="contact-us"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1 text-primary"
                  : "flex items-center gap-1 hover:text-primary"
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
                  ? "flex items-center gap-1 text-primary"
                  : "flex items-center gap-1 hover:text-primary"
              }
            >
              <FaPeopleGroup />
              درباره ما
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
