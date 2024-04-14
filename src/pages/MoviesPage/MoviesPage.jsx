import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import { fetchMovieByName } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);

  const getMoviesByName = async (query, page = 1) => {
    try {
      setLoading(true);
      setTotalPages(null);
      const resData = await fetchMovieByName(query, page);
      setTotalPages(resData["total_pages"]);
      setMovies((prev) => [...prev, ...resData.results]);
      // setMovies(resData.results);
    } catch (err) {
      setIsError(true);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue === "") return;
    getMoviesByName(searchValue);
  }, [searchValue]);

  const handleSearchPressed = (query) => {
    setSearchValue(query);
  };

  return (
    <main>
      <SearchBar onSubmit={handleSearchPressed} />
      <MovieList movies={movies} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </main>
  );
}
