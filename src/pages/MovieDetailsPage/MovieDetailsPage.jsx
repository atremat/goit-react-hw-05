import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchMovieById } from "../../services/api";
import MoviePage from "../../components/MoviePage/MoviePage";
import { GoBackBtn } from "../../components/GoBack/GoBackBtn";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    getMovieById(movieId);
  }, [movieId]);

  const getMovieById = async (id) => {
    try {
      setLoading(true);
      const resData = await fetchMovieById(id);
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
      <GoBackBtn />
      {movie && <MoviePage movie={movie} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </main>
  );
}
