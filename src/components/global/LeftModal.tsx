import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface LeftModalProps {
  isOpen: boolean;
  children: ReactNode;
  handleClose: () => void;
  title?: string;
}

const LeftModal: React.FC<LeftModalProps> = ({
  isOpen,
  children,
  handleClose,
  title,
}) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 w-full h-screen z-20 transition-all duration-200",
        isOpen
          ? "pointer-events-auto backdrop-blur-[2px] bg-gray-700/10"
          : "pointer-events-none bg-transparent"
      )}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <section
        className={cn(
          "absolute bottom-0 z-20 w-[90%] max-w-[450px] h-[95%] rounded-tr-lg shadow-md transition-transform duration-200 flex flex-col text-gray-700 overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-[101%]"
        )}
      >
        <div className="flex flex-col h-full gap-6 px-4 py-5 bg-gray-50 border-r-gray-200 md:py-8 md:px-6 ">
          <div
            className={cn(
              "flex items-center w-full",
              title ? "justify-between" : "justify-end"
            )}
          >
            {title && <h2 className="text-lg font-bold">{title}</h2>}
            <button
              className="grid place-items-center w-[35px] h-[35px] rounded-md bg-gray-100 md:w-[40px] md:h-[40px]"
              onClick={handleClose}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </section>
    </aside>
  );
};

export default LeftModal;
