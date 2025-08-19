import * as React from "react";
import clsx from "clsx";
import styles from './index.module.css';
import { libre } from "@/app/font";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  block?: boolean;
};

export function Button({ className, variant = "primary", block, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        libre.className,
        "italic relative h-10 cursor-pointer text-center text-base rounded-[11px]",
        block && "w-full",
        variant === "primary" &&
          "bg-[#BB959D] text-white px-6 hover:opacity-90 active:opacity-80",
        variant === "ghost" &&
          "bg-transparent text-stone-600 hover:bg-stone-200",
        className
      )}
      {...props}
    />
  );
}