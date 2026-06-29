import { Link, useLocation } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../services/api.js';
import styles from './MovieList.module.css';

const PLACEHOLDER = 'https://placehold.co/300x450?text=No+image';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={styles.link}
          >
            <img
              className={styles.poster}
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : PLACEHOLDER
              }
              alt={movie.title}
              width="300"
              height="450"
            />
            <p className={styles.title}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
