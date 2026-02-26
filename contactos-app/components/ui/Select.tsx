import { SelectHTMLAttributes } from "react";
import { clsx } from "clsx";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>}
      <select
        className={clsx(
          "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors",
          className
        )}
        {...props}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}