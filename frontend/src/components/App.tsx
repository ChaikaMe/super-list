import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./Loader/Loader.tsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage.tsx"));
const HeroPage = lazy(() => import("../pages/HeroPage/HeroPage.tsx"));
const HeroesListPage = lazy(
  () => import("../pages/HeroesListPage/HeroesListPage.tsx")
);
const NotFoundPage = lazy(
  () => import("../pages/NotFoundPage/NotFoundPage")
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/heroes" element={<HeroesListPage />} />
        <Route path="/heroes/:heroId" element={<HeroPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
