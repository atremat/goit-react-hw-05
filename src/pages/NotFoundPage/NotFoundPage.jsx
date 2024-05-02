import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={css.wrapper}>
      <Link to="/" className={css.link}>
        Back to home page
      </Link>
      <p className={css.error}>Oops! This page does not exist!</p>
    </main>
  );
}
