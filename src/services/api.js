import axios from "axios";

const API_TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

const fetchTrendingMovies = async (page = 1) => {
  const END_POINT = `/3/trending/movie/day?language=en-US&page=${page}`;
  const url = `${BASE_URL}${END_POINT}`;

  const response = await axios.get(url, options);
  // console.log(response);
  return response.data;
};

const fetchMovieByName = async (query, page = 1) => {
  const END_POINT = `/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  const url = `${BASE_URL}${END_POINT}`;

  const response = await axios.get(url, options);
  // console.log(response);
  return response.data;
};

const fetchMovieById = async (id) => {
  const END_POINT = `/3/movie/${id}?language=en-US`;
  const url = `${BASE_URL}${END_POINT}`;

  const response = await axios.get(url, options);
  console.log(response);
  return response.data;
};

export { fetchTrendingMovies, fetchMovieByName, fetchMovieById };
