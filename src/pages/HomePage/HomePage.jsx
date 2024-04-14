import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);

  const getTrendingMovies = async (page) => {
    try {
      setLoading(true);
      setTotalPages(null);
      const resData = await fetchTrendingMovies(page);
      setTotalPages(resData["total_pages"]);
      setMovies((prev) => [...prev, ...resData.results]);
      setMovies(resData.results);
    } catch (err) {
      setIsError(true);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  //get trending movies
  useEffect(() => {
    getTrendingMovies(page);
  }, [page]);

  //output movies
  useEffect(() => {
    console.log("movies: ", movies);
  }, [movies]);

  return (
    <main>
      <p>Trending today</p>
      <MovieList movies={movies} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </main>
  );
}
