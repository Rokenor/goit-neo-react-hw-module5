import axios from 'axios';

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const DEFAULT_PARAMS = { language: 'en-US' };

export const getTrendingMovies = async (timeWindow = 'day') => {
  const { data } = await tmdb.get(`/trending/movie/${timeWindow}`, {
    params: DEFAULT_PARAMS,
  });
  return data.results;
};

export const searchMovies = async query => {
  const { data } = await tmdb.get('/search/movie', {
    params: { ...DEFAULT_PARAMS, query, include_adult: false, page: 1 },
  });
  return data.results;
};

export const getMovieDetails = async movieId => {
  const { data } = await tmdb.get(`/movie/${movieId}`, {
    params: DEFAULT_PARAMS,
  });
  return data;
};

export const getMovieCredits = async movieId => {
  const { data } = await tmdb.get(`/movie/${movieId}/credits`, {
    params: DEFAULT_PARAMS,
  });
  return data.cast;
};

export const getMovieReviews = async movieId => {
  const { data } = await tmdb.get(`/movie/${movieId}/reviews`, {
    params: { ...DEFAULT_PARAMS, page: 1 },
  });
  return data.results;
};
