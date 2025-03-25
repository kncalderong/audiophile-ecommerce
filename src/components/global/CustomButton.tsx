import { Button, ButtonProps } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Ensure you have ShadCN’s `cn` utility
import { ChevronRight } from "lucide-react";

const buttonVariants = cva(
  "rounded-none font-medium transition-all duration-200 flex items-center gap-2 uppercase", // Common styles
  {
    variants: {
      variant: {
        primary: "bg-store-orange-dark text-white hover:bg-store-orange-light",
        secondary:
          "bg-white border border-black text-black hover:bg-black hover:text-white",
        outline:
          "bg-transparent text-gray-500 shadow-none hover:opacity-100 hover:text-store-orange-dark hover:bg-transparent",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface CustomButtonProps
  extends Omit<ButtonProps, "variant" | "size">,
    VariantProps<typeof buttonVariants> {
  withIcon?: boolean;
}

const CustomButton = ({
  className,
  variant,
  size,
  withIcon = true,
  children,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {variant === "outline" && withIcon && (
        <ChevronRight
          size={20}
          strokeWidth={3}
          className="text-store-orange-dark"
        />
      )}
    </Button>
  );
};

export { CustomButton, buttonVariants };
