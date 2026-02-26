import { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>}
      <input
        className={clsx(
          "w-full px-3 py-2 border rounded-lg text-sm outline-none transition-colors",
          "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white",
          error && "border-red-400",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}