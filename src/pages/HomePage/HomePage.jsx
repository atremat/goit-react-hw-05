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

  useEffect(() => {
    const controller = new AbortController();

    const getTrendingMovies = async (page = 1) => {
      try {
        setLoading(true);
        const resData = await fetchTrendingMovies({
          abortController: controller,
          page,
        });
        // setMovies(resData.results);
        setMovies((prev) => [...prev, ...resData.results]);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setIsError(true);
          console.log("error");
        }
      } finally {
        setLoading(false);
      }
    };
    getTrendingMovies();

    return () => {
      controller.abort();
    };
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
