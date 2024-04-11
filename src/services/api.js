import axios from "axios";

const API_TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org";

const params = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

const fetchTrendingMovies = async () => {
  const END_POINT = `/3/trending/movie/day`;
  const url = `${BASE_URL}${END_POINT}`;

  const response = await axios.get(url, params);
  console.log(response);
  return response.data;
};

export default fetchTrendingMovies;
