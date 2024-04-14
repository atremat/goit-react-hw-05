import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={CSS.list}>
      {movies.map(({ id, original_title }) => {
        return (
          <li key={id}>
            <Link to={`/movies/${id}`} state={location}>
              <h3 className={css.movieName}>{original_title}</h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
