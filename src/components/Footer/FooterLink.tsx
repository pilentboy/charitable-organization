import { Link } from "react-router";

const FooterLink = ({
  title,
  link,
  icon,
}: {
  title: string;
  link: string;
  icon: any;
}) => {
  return (
    <li className="relative ">
      <Link
        to={link}
        className="flex items-center gap-1  relative after:absolute after:content['']  h-full after:bottom-0 pb-1 after:left-0  after:w-full after:h-[1px] after:bg-primary hover:after:translate-x-0 after:duration-500 after:translate-x-[100%] overflow-hidden "
      >
        {icon}
        {title}
      </Link>
    </li>
  );
};

export default FooterLink;
