import ReactDOM from "react-dom";
import { useEffect } from "react";

const Modal = ({
  children,
  isOpen,
  closeModal,
  parentSelector,
}: {
  children: JSX.Element;
  isOpen: boolean;
  closeModal?: () => void;
  parentSelector: string;
}) => {
  const parentElement = isOpen
    ? (document.querySelector(parentSelector) as HTMLElement)
    : null;

  useEffect(() => {
    if (parentElement) {
      parentElement.style.overflowY = isOpen ? "hidden" : "auto";
    }
    return () => {
      if (parentElement) {
        parentElement.style.overflowY = "auto";
      }
    };
  }, [isOpen, parentSelector, parentElement]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      onClick={closeModal}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backgroundRepeat: "repeat",
        backdropFilter: "blur(6px) saturate(90%) brightness(90%)",
      }}
      className={`fixed w-full h-full top-0 left-0 bottom-0 right-0 z-[20]`}
    >
      <div
        className="top-[20px] absolute left-[50%] -translate-x-2/4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.querySelector(parentSelector) as HTMLElement
  );
};

export default Modal;
