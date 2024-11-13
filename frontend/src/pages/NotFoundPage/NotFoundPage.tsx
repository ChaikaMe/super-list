import css from "./NotFoundPage.module.css";
import LinkButton from "../../components/LinkButton/LinkButton";
import MainTitle from "../../components/MainTitle/MainTitle";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <MainTitle className={css.mainTitle}>
        This page does not exist, please return to home page
      </MainTitle>
      <LinkButton address={"/"} className={css.button}>
        Return!
      </LinkButton>
    </div>
  );
}
