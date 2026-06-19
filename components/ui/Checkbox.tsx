import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={inputId}
          ref={ref}
          className={`h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 disabled:opacity-50 ${className}`}
          {...props}
        />
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium leading-none text-slate-700 select-none cursor-pointer">
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";