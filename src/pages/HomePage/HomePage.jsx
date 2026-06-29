import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { getTrendingMovies } from '../../services/api.js';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await getTrendingMovies('day');
        setMovies(results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>
      {isLoading && <p>Loading movies...</p>}
      {isError && (
        <p className={styles.error}>
          Something went wrong. Please try again later.
        </p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default HomePage;
