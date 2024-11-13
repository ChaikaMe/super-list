import clsx from "clsx";
import css from "./Button.module.css";
import { ButtonProps } from "../../types/components";

export default function Button({
  children,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={clsx(className, css.button)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
