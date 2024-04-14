import css from "./MoviePage.module.css";

const MoviePage = ({ movie }) => {
  const { poster_path: posterRelative, title } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500/${posterRelative}`;
  return (
    <div className={css.container}>
      <section className={css.mainSection}>
        <img className={css.poster} src={posterUrl} alt={title} />
        <div className={css.mainInfo}>
          <h1>{title}</h1>
        </div>
      </section>
      <section className={css.addSection}></section>
    </div>
  );
};

export default MoviePage;
