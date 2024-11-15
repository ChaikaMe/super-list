import { useLocation } from "react-router-dom";
import css from "./HeroPage.module.css";
import { useEffect, useState } from "react";
import { heroData } from "../../types/data";
import { fetchHeroData } from "../../axios/heroes.ts";
import MainHeroData from "../../components/MainHeroData/MainHeroData.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import { Toaster } from "react-hot-toast";

export default function HeroPage() {
  const location = useLocation();
  const heroId = location.pathname.split("/").filter(Boolean).pop();

  const [heroData, setHeroData] = useState<heroData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchHeroData(heroId);
      setHeroData(response);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className={css.page}>
      <Toaster position="top-center" />
      <div className={css.container}>
        {loading || !heroData ? (
          <Loader />
        ) : (
          <MainHeroData hero={heroData} />
        )}
      </div>
    </div>
  );
}
