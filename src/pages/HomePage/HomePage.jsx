import fetchTrendingMovies from "../../services/api";

export default function HomePage() {
  fetchTrendingMovies();
  return (
    <>
      <p>Homepage</p>
    </>
  );
}
