import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api.js';
import Loader from '../Loader/Loader.jsx';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await getMovieReviews(movieId);
        setReviews(results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) {
    return <Loader text="Loading reviews..." />;
  }

  if (isError) {
    return (
      <p className={styles.error}>
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (reviews.length === 0) {
    return <p>We don&apos;t have any reviews for this movie.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map(review => (
        <li key={review.id} className={styles.item}>
          <h4 className={styles.author}>{review.author}</h4>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
