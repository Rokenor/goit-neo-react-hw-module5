import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { searchMovies } from '../../services/api.js';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  const handleSubmit = event => {
    event.preventDefault();
    const value = event.target.elements.query.value.trim();

    if (value === '') {
      setSearchParams({});
      return;
    }

    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await searchMovies(query);
        setMovies(results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="query"
          defaultValue={query}
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>

      {isLoading && <Loader text="Loading movies..." />}
      {isError && (
        <p className={styles.error}>
          Something went wrong. Please try again later.
        </p>
      )}
      {!isLoading && !isError && query !== '' && movies.length === 0 && (
        <p>No movies found for &quot;{query}&quot;.</p>
      )}
      {query !== '' && movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default MoviesPage;
