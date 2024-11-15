import { useNavigate } from "react-router-dom";
import { HeroListItemProps } from "../../types/components";
import css from "./HeroListItem.module.css";

export default function HeroListItem({ hero }: HeroListItemProps) {
  const navigate = useNavigate();
  return (
    <li
      className={css.item}
      onClick={() => navigate(`/heroes/${hero._id}`)}
    >
      {hero.images.length === 0 ? (
        <div className={css.noImageContainer}>No Image!</div>
      ) : (
        <img
          className={css.image}
          src={hero.images[0]}
          alt={hero.nickname}
        />
      )}
      <div className={css.heroNameContainer}>
        <p className={css.heroName}>{hero.nickname}</p>
      </div>
    </li>
  );
}
