import clsx from "clsx";
import css from "./MainTitle.module.css";
import { MainTitleProps } from "../../types/components";

export default function MainTitle({
  className,
  children,
}: MainTitleProps) {
  return (
    <h1 className={clsx(css.mainTitle, className)}>{children}</h1>
  );
}
