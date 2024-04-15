import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

export default function Navigation() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <header className={css.header}>
      <p className={css.logo}>
        <span role="img" aria-label="movie icon">
          🎞
        </span>{" "}
        Movies Search
      </p>

      <nav className={css.nav}>
        <ul className={css.list}>
          <li className={css.item}>
            <NavLink to="/" className={buildLinkClass}>
              Home
            </NavLink>
          </li>
          <li className={css.item}>
            <NavLink to="/movies" className={buildLinkClass}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
