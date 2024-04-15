import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import { fetchMovieByName } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  const getMoviesByName = async (query, page = 1) => {
    try {
      setLoading(true);
      const resData = await fetchMovieByName(query, page);
      setMovies(resData.results);
    } catch (err) {
      setIsError(true);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query === "") return;
    getMoviesByName(query);
  }, [query]);

  const handleSearchPressed = (query) => {
    setSearchParams({ query });
  };

  return (
    <main className={css.main}>
      <SearchBar onSubmit={handleSearchPressed} />
      <MovieList movies={movies} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </main>
  );
}
