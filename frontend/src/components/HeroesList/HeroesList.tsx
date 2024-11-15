import css from "./HeroesList.module.css";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { fetchHeroes, postHero } from "../../axios/heroes.ts";
import { heroData } from "../../types/data";
import HeroListItem from "../HeroListItem/HeroListItem";
import Loader from "../Loader/Loader";

export default function HeroesList() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    heroes: [] as heroData[],
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
  });

  const handleLoadClick = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetchHeroes(page);
      setData((prevData) => ({
        ...response,
        heroes: [
          ...prevData.heroes,
          ...response.heroes.filter(
            (newHero: heroData) =>
              !prevData.heroes.some(
                (hero) => hero._id === newHero._id
              )
          ),
        ],
      }));
      setLoading(false);
    }
    fetchData();
  }, [page]);

  const [addState, setAddState] = useState(false);
  const heroNameRef = useRef<HTMLInputElement | null>(null);
  const handlePostClick = async () => {
    setAddState(!addState);
    if (addState && heroNameRef.current?.value) {
      await postHero(heroNameRef.current.value);
      const response = await fetchHeroes(1);
      console.log(response);
      setData((prevData) => ({
        ...prevData,
        heroes: [response.heroes[0], ...prevData.heroes],
      }));
    }
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        <li className={css.addItem}>
          {addState && (
            <input
              ref={heroNameRef}
              name="name"
              autoComplete="off"
              placeholder="Enter hero name!"
            />
          )}

          <Button
            className={css.addButton}
            onClick={() => handlePostClick()}
          >
            Add Hero!
          </Button>
        </li>
        {data.heroes.map((item) => (
          <HeroListItem hero={item} key={item._id} />
        ))}
      </ul>
      {loading ? (
        <Loader />
      ) : (
        data.hasNextPage && (
          <Button className={css.button} onClick={handleLoadClick}>
            Load More
          </Button>
        )
      )}
    </div>
  );
}
