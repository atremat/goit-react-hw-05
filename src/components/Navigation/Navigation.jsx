import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import { MdLocalMovies } from "react-icons/md";

export default function Navigation() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <header className={css.header}>
      <p className={css.logo}>
        <MdLocalMovies className={css.icon} size="2rem" />
        <span className={css.logoText}>Movies Search</span>
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
