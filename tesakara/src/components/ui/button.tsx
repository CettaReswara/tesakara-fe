import * as React from "react";
import clsx from "clsx";
import styles from './button.module.css';
import { libre } from "@/app/font";

// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: "primary" | "ghost";
//   block?: boolean;
// };

// import { libre } from "@/app/font";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  block?: boolean;
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-6",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
  icon: "h-7 w-7 p-1", // square, no padding
};

export function Button({
  className,
  variant = "primary",
  size = "default",
  block,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        libre.className,
        // center the child (icon/text) precisely
        "italic relative inline-flex items-center justify-center",
        "cursor-pointer text-center text-base rounded-[11px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        block && "w-full",

        // size
        sizeClasses[size],

        // variant (no hard-coded padding here)
        variant === "primary" &&
          "bg-[#BB959D] text-white hover:opacity-90 active:opacity-80",
        variant === "ghost" &&
          "bg-transparent text-stone-600 hover:bg-stone-200",

        className
      )}
      {...props}
    />
  );
};

// export function Button({ className, variant = "primary", block, ...props }: ButtonProps) {
//   return (
//     <button
//       className={clsx(
//         libre.className,
//         "italic relative h-10 cursor-pointer text-center text-base rounded-[11px]",
//         block && "w-full",
//         variant === "primary" &&
//           "bg-[#BB959D] text-white px-6 hover:opacity-90 active:opacity-80",
//         variant === "ghost" &&
//           "bg-transparent text-stone-600 hover:bg-stone-200",
//         className
//       )}
//       {...props}
//     />
//   );
// }