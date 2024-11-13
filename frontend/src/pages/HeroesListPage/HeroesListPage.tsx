import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button/Button";
import HeroesList from "../../components/HeroesList/HeroesList";
import css from "./HeroesListPage.module.css";
import { fetchHeroes } from "../../axios/heroes";
import { dataType } from "../../types/data";

export default function HeroesListPage() {
  const [page, setPage] = useState(1);

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<dataType>({
    hasNextPage: false,
    hasPreviousPage: false,
    heroes: [],
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
  });

  // need to fix data receiving

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const responce = await fetchHeroes(page);
      if (data.heroes.length === 0) {
        return setData(responce);
      }
      setData(responce);
      setLoading(false);
    }
    fetchData();
    console.log("effectivno");
    console.log(data);
  }, []);

  return (
    <div className={css.container}>
      {!loading && <HeroesList heroes={data.heroes} />}
      <Button
        className={css.button}
        onClick={handleClick}
        // disabled={data.hasNextPage}
      >
        Load More
      </Button>
    </div>
  );
}
