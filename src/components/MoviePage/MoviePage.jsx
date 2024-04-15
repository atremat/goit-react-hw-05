import { NavLink, Outlet } from "react-router-dom";
import css from "./MoviePage.module.css";
import clsx from "clsx";

const MoviePage = ({ movie }) => {
  const {
    poster_path: posterRelative,
    title,
    overview,
    vote_average: rank,
    genres,
    budget,
    release_date: fullDate,
  } = movie;

  const IMG_BASE_URL = `https://image.tmdb.org/t/p/w500`;
  const posterUrl = posterRelative
    ? `${IMG_BASE_URL}${posterRelative}`
    : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  const year = fullDate.slice(0, 4);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div className={css.container}>
      <section className={css.mainSection}>
        <img className={css.poster} src={posterUrl} alt={title} />
        <div className={css.mainInfo}>
          <h1 className={css.title}>
            {title}
            {year && <span className={css.year}> ({year})</span>}
          </h1>

          {rank !== 0 && (
            <>
              <h2 className={css.rankTitle}>Rank</h2>
              <p>{rank.toFixed(1)} / 10</p>
            </>
          )}

          {budget !== 0 && (
            <>
              <h2 className={css.budgetTitle}>Budget</h2>
              <p className={css.budget}>{budget} $</p>
            </>
          )}

          <h2 className={css.overviewTitle}>Overview</h2>
          <p className={overview}>{overview}</p>

          {genres.length > 0 && (
            <>
              <h2 className={css.genresTitle}>Genres</h2>
              <p className={css.genres}>
                {genres.map((genre) => genre.name).join(", ")}
              </p>
            </>
          )}
        </div>
      </section>
      <section className={css.addSection}>
        <h2 className={css.addTitle}>Additional information</h2>
        <ul className={css.addList}>
          <li className={css.addItem}>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
          </li>
          <li className={css.addItem}>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </section>
    </div>
  );
};

export default MoviePage;
