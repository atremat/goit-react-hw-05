import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCreditById } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [credit, setCredit] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { movieId } = useParams();

  const cast = credit?.cast ?? [];
  const IMG_BASE_URL = `https://image.tmdb.org/t/p/w500`;
  const DEFAULT_CAST_PHOTO =
    "https://dummyimage.com/150x225/000/fff.jpg&text=no+photo";

  useEffect(() => {
    getMovieCreditById(movieId);
  }, [movieId]);

  const getMovieCreditById = async (id) => {
    try {
      setLoading(true);
      const resData = await fetchMovieCreditById(id);

      setCredit(resData);
    } catch (err) {
      setIsError(true);
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={css.section}>
      {credit && cast.length > 0 ? (
        <ul className={css.list}>
          {cast.map((actor) => {
            return (
              <li key={actor.id} className={css.item}>
                <img
                  src={
                    actor["profile_path"]
                      ? IMG_BASE_URL + actor["profile_path"]
                      : DEFAULT_CAST_PHOTO
                  }
                  alt={actor.name}
                  className={css.img}
                />
                <h4 className={css.name}>{actor.name}</h4>
                <p className={css.character}>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Sorry, we have no information about cast.</p>
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </section>
  );
}
