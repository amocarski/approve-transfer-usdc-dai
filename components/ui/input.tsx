import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any | null;
  label?: string;
  action?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, id, action, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        {(label || error || action) && (
          <div className="flex w-full flex-row items-center justify-end">
            {label && (
              <Label className="h-4 w-full" htmlFor={id?.toLowerCase()}>
                {label}
              </Label>
            )}
            {error && (
              <Label
                className="mx-4 h-4 w-full text-right text-xs text-red-700"
                htmlFor={id?.toLowerCase()}
              >
                {error}
              </Label>
            )}
            {action && action}
          </div>
        )}

        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-700",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
