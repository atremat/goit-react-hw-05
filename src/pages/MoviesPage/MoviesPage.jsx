import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import { fetchMovieByName } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useParams, useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  // const [searchValue, setSearchValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // const params = useParams();
  // console.log("params: ", params);
  // console.log("searchparams: ", searchParams);
  const query = searchParams.get("query") ?? "";

  const getMoviesByName = async (query, page = 1) => {
    try {
      setLoading(true);
      setTotalPages(null);
      const resData = await fetchMovieByName(query, page);
      setTotalPages(resData["total_pages"]);
      // setMovies((prev) => [...prev, ...resData.results]);
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
    <main>
      <SearchBar value={query} onSubmit={handleSearchPressed} />
      <MovieList movies={movies} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </main>
  );
}
