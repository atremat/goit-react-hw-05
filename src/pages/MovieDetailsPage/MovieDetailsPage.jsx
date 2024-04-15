import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchMovieById } from "../../services/api";
import MoviePage from "../../components/MoviePage/MoviePage";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    getMovieById(movieId);
  }, [movieId]);

  // useEffect(() => {
  //   console.log("movie: ", movie);
  // }, [movie]);

  const getMovieById = async (id) => {
    try {
      setLoading(true);
      const resData = await fetchMovieById(id);
      // console.log("resData: ", resData);
      setMovie(resData);
    } catch (err) {
      setIsError(true);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.main}>
      {movie && <MoviePage movie={movie} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </main>
  );
}
