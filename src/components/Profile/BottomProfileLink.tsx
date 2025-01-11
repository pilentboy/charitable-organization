import { ReactElement } from "react";

// Define the props for the BottomProfileLink component
interface BottomProfileLinkProps {
  icon: ReactElement; // The icon to display for the link
  title: string; // The title or label of the link
  profileDisplay: "donations" | "profile"; // The current active profile display (either "donations" or "profile")
  id?: string; // Optional ID to identify the link (useful for comparison with profileDisplay)
  action: () => void; // The action to be executed when the link is clicked
  loading?: boolean; // Optional loading state to show a disabled or dimmed button
}

const BottomProfileLink = ({
  icon,
  title,
  action,
  profileDisplay,
  id,
  loading,
}: BottomProfileLinkProps) => {
  // Determine if the current link is active by comparing profileDisplay with the id
  const isActive = profileDisplay === id;

  return (
    <button
      id={id} // Assign the link's id to the button element
      type="button"
      className={`flex flex-col items-center gap-1 duration-150 ${
        loading ? "opacity-50" : "opacity-100" // Apply opacity based on loading state
      } ${
        title === "خروج از حساب" ? "hover:text-red-500" : "hover:text-primary" // Change hover color based on title (logout turns red)
      } ${isActive ? "text-primary" : ""}`} // Highlight active link with primary color
      onClick={action} // Trigger the action when the button is clicked
      disabled={loading} // Disable the button when loading
    >
      {icon} // Display the icon for the link
      <span>{title}</span> // Display the title of the link
    </button>
  );
};

export default BottomProfileLink;
