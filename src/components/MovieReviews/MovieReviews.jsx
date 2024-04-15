import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviewsById } from "../../services/api";
import css from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { movieId } = useParams();

  // const cast = credit?.cast ?? [];
  // const IMG_BASE_URL = `https://image.tmdb.org/t/p/w500`;

  useEffect(() => {
    getMovieReviewById(movieId);
  }, [movieId]);

  useEffect(() => {
    console.log("movie: ", reviews);
  }, [reviews]);

  const getMovieReviewById = async (id, page = 1) => {
    try {
      setLoading(true);
      const resData = await fetchMovieReviewsById(id, page);
      console.log("resData: ", resData);
      setReviews(resData.results);
    } catch (err) {
      setIsError(true);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={css.section}>
      {reviews && (
        <ul className={css.list}>
          {reviews.map((review) => {
            return (
              <li key={review.id} className={css.item}>
                <h4 className={css.author}>{review.author}</h4>
                <p className={css.content}>{review.content}</p>
                <hr />
              </li>
            );
          })}
        </ul>
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </section>
  );
}
