import { Link } from "react-router";
import logo from "../assets/images/logo.png";

export default function Logo({ size }: { size?: string }) {
  return (
    <Link to={"/"}>
      <img
        src={logo}
        alt="logo"
        className={`${size ? size : "w-24 sm:w-[130px]"}`}
      />
    </Link>
  );
}
