import React from "react";



const Select = React.forwardRef<
  React.ElementRef<"select">,
  React.ComponentPropsWithoutRef<"select">
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={`block rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

const SelectItem = React.forwardRef<
  React.ElementRef<"option">,
  React.ComponentPropsWithoutRef<"option">
>(({ className, children, ...props }, ref) => (
  <option
    ref={ref}
    className={`block  px-3 py-2 text-sm ${className}`}
    {...props}
  >
    {children}
  </option>
));
SelectItem.displayName = "SelectItem";

export { Select, SelectItem };