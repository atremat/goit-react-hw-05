import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);

  const getTrendingMovies = async (page = 1) => {
    try {
      setLoading(true);
      const resData = await fetchTrendingMovies(page);
      setMovies((prev) => [...prev, ...resData.results]);
      setMovies(resData.results);
    } catch (err) {
      setIsError(true);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <main className={css.main}>
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </main>
  );
}
