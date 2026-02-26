import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "danger" | "ghost";
  size?: "sm" | "md";
}

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  success: "bg-emerald-600 hover:bg-emerald-700 text-white",
  danger:  "bg-red-500 hover:bg-red-600 text-white",
  ghost:   "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300",
};

const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm" };

export function Button({ variant = "primary", size = "md", className, children, ...props }: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center gap-1.5 font-medium rounded-lg transition-colors disabled:opacity-50 cursor-pointer",
        variants[variant], sizes[size], className
      )}
      {...props}
    >
      {children}
    </button>
  );
}