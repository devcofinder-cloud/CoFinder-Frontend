"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-zinc-300">
            {label}
          </label>
        )}

        <div
          className={`flex items-center rounded-xl border bg-zinc-900 px-4 py-3 transition-all
          ${
            error
              ? "border-red-500"
              : "border-zinc-700 focus-within:border-indigo-500"
          }`}
        >
          {icon && (
            <div className="mr-3 text-zinc-500">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff
                  size={18}
                  className="text-zinc-500"
                />
              ) : (
                <Eye
                  size={18}
                  className="text-zinc-500"
                />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;