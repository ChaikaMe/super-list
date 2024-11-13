import { NavLink } from "react-router-dom";
import css from "./LinkButton.module.css";
import clsx from "clsx";
import { LinkButtonProps } from "../../types/components";

export default function LinkButton({
  children,
  className,
  address,
}: LinkButtonProps) {
  return (
    <NavLink className={clsx(className, css.button)} to={address}>
      {children}
    </NavLink>
  );
}
