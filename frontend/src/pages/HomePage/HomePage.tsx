import LinkButton from "../../components/LinkButton/LinkButton";
import MainTitle from "../../components/MainTitle/MainTitle";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.container}>
      <MainTitle className={css.mainTitle}>
        Welcome to Heroes list App!
      </MainTitle>
      <LinkButton className={css.button} address={"/heroes"}>
        See the heroes!
      </LinkButton>
    </div>
  );
}
