import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={css.wrapper}>
      <p className={css.error}>Oops! This page does not exist!</p>
    </main>
  );
}
