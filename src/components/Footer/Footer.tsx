import FooterLink from "./FooterLink";
import { FaRegUser } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="min-h-40 border-t w-full mt-10 flex flex-col sm:flex-row sm:items-center justify-between p-2">
      <div className="flex flex-col gap-3 items-start ">
        <h1 className="text-primary font-bold ">ندر آنلاین</h1>
        <ul className="flex flex-col   justify-center text-black gap-5 md:flex-row ">
          <FooterLink title="نذر آنلاین" link="/" icon={<FaRegHeart />} />
          <FooterLink
            title="ارتباط با ما"
            link="/contact-us"
            icon={<CiLocationOn />}
          />
          <FooterLink
            title="درباره ما"
            link="/about-us"
            icon={<FaPeopleGroup />}
          />
          <FooterLink
            title="حساب کاربری"
            link="/profile"
            icon={<FaRegUser />}
          />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
