import { NavLink } from "react-router-dom";
import css from "./MoviePage.module.css";

const MoviePage = ({ movie }) => {
  const {
    poster_path: posterRelative,
    backdrop_path: backdrop,
    title,
    overview,
    vote_average: rank,
    genres,
    budget,
    release_date: fullDate,
  } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterRelative}`;
  const year = fullDate.slice(0, 4);

  return (
    <div className={css.container}>
      <section className={css.mainSection}>
        <img className={css.poster} src={posterUrl} alt={title} />
        <div className={css.mainInfo}>
          <h1 className={css.title}>
            {title}
            <span className={css.year}> ({year})</span>
          </h1>

          <h2 className={css.rankTitle}>Rank</h2>
          <p>{rank} / 10</p>

          {budget && (
            <>
              <h2 className={css.budgetTitle}>Budget</h2>
              <p className={css.budget}>{budget} $</p>
            </>
          )}

          <h2 className={css.overviewTitle}>Overview</h2>
          <p className={overview}>{overview}</p>

          <h2 className={css.genresTitle}>Genres</h2>
          <p className={css.genres}>
            {genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </section>
      <section className={css.addSection}>
        <h2 className={css.addTitle}>Additional information</h2>
        <ul className={css.addList}>
          <li className={css.addItem}>
            <NavLink
              to="cast"
              className={({ isActive }) => (isActive ? css.active : css.link)}
            >
              Cast
            </NavLink>
          </li>
          <li className={css.addItem}>
            <NavLink
              to="reviews"
              className={({ isActive }) => (isActive ? css.active : css.link)}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default MoviePage;
