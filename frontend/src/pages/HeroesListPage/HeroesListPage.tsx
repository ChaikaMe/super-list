import HeroesList from "../../components/HeroesList/HeroesList";
import css from "./HeroesListPage.module.css";

export default function HeroesListPage() {
  return (
    <div className={css.container}>
      <HeroesList />
    </div>
  );
}
