import { ReactNode, useRef } from "react";

const ModalContainer = ({
  display,
  setDisplay,
  children,
}: {
  display: boolean;
  children: ReactNode;
  setDisplay: any;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setDisplay(false);
    }
  };
  
  if (display)
    return (
      <div
        className="w-screen min-h-screen flex items-center justify-center modal-open-anima fixed top-0 left-0  backdrop-brightness-50 z-[1000]"
        onClick={handleClickOutside}
      >
        <div ref={modalRef}>{children}</div>
      </div>
    );
};

export default ModalContainer;
