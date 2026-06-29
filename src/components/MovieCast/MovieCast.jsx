import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, IMAGE_BASE_URL } from '../../services/api.js';
import Loader from '../Loader/Loader.jsx';
import styles from './MovieCast.module.css';

const PLACEHOLDER = 'https://placehold.co/200x300?text=No+photo';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await getMovieCredits(movieId);
        setCast(results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) {
    return <Loader text="Loading cast..." />;
  }

  if (isError) {
    return (
      <p className={styles.error}>
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (cast.length === 0) {
    return <p>We don&apos;t have any cast information for this movie.</p>;
  }

  return (
    <ul className={styles.list}>
      {cast.map(actor => (
        <li key={actor.id} className={styles.item}>
          <img
            className={styles.photo}
            src={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${actor.profile_path}`
                : PLACEHOLDER
            }
            alt={actor.name}
            width="150"
            height="225"
          />
          <p className={styles.name}>{actor.name}</p>
          <p className={styles.character}>{actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
