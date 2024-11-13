import css from "./HeroesList.module.css";
import { HeroesListProps } from "../../types/components";

export default function HeroesList({ heroes }: HeroesListProps) {
  return (
    <ul className={css.list}>
      {heroes.map((item, index) => (
        <div key={index}>{item.nickname}</div>
      ))}
    </ul>
  );
}
