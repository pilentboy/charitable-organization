import { ReactElement } from "react";

interface BottomProfileLinkProps {
  icon: ReactElement;
  title: string;
  profileDisplay: "donations" | "profile";
  id?: string;
  action: () => void;
}

const BottomProfileLink = ({
  icon,
  title,
  action,
  profileDisplay,
  id,
}: BottomProfileLinkProps) => (
  <button
    id={id}
    type="button"
    className={`flex flex-col hover:text-primary duration-150 gap-1 items-center ${
      profileDisplay === id ? "text-primary" : null
    }`}
    onClick={() => action()}
  >
    {icon}
    {title}
  </button>
);

export default BottomProfileLink;
