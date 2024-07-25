import React, { ReactNode } from "react";

function Modal({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  const handleBgClick = (e: any) => {
    if (e.target.id === "modal-background") {
      onClick();
    }
  };

  return (
    <div
      id="modal-background"
      onClick={handleBgClick}
      className="fixed z-[9998] top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center"
    >
      {children}
    </div>
  );
}

export default Modal;
