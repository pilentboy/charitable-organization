import { ReactElement } from "react";

interface BottomProfileLinkProps {
  icon: ReactElement;
  title: string;
  profileDisplay: "donations" | "profile";
  id?: string;
  action: () => void;
  loading?: boolean;
}

const BottomProfileLink = ({
  icon,
  title,
  action,
  profileDisplay,
  id,
  loading,
}: BottomProfileLinkProps) => {
  const isActive = profileDisplay === id;

  return (
    <button
      id={id}
      type="button"
      className={`flex flex-col items-center gap-1 duration-150 ${
        loading ? "opacity-50" : "opacity-100"
      } ${
        title === "خروج از حساب" ? "hover:text-red-500" : "hover:text-primary"
      } ${isActive ? "text-primary" : ""}`}
      onClick={action}
      disabled={loading}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

export default BottomProfileLink;
