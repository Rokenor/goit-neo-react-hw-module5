import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import clsx from 'clsx';
import { getMovieDetails, IMAGE_BASE_URL } from '../../services/api.js';
import Loader from '../../components/Loader/Loader.jsx';
import styles from './MovieDetailsPage.module.css';

const PLACEHOLDER = 'https://placehold.co/300x450?text=No+image';

const buildLinkClass = ({ isActive }) =>
  clsx(styles.subLink, isActive && styles.subLinkActive);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  return (
    <main className={styles.container}>
      {/* eslint-disable-next-line react-hooks/refs */}
      <Link to={backLinkRef.current} className={styles.goBack}>
        ← Go back
      </Link>

      {isLoading && <Loader text="Loading movie..." />}
      {isError && (
        <p className={styles.error}>
          Something went wrong. Please try again later.
        </p>
      )}

      {movie && (
        <>
          <div className={styles.details}>
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
            <div className={styles.info}>
              <h1 className={styles.title}>
                {movie.title}
                {movie.release_date && ` (${movie.release_date.slice(0, 4)})`}
              </h1>
              <p>User score: {Math.round(movie.vote_average * 10)}%</p>
              <h2 className={styles.subtitle}>Overview</h2>
              <p>{movie.overview || 'No overview available.'}</p>
              <h2 className={styles.subtitle}>Genres</h2>
              <p>
                {movie.genres?.length
                  ? movie.genres.map(genre => genre.name).join(', ')
                  : 'N/A'}
              </p>
            </div>
          </div>

          <div className={styles.additional}>
            <h3 className={styles.additionalTitle}>Additional information</h3>
            <ul className={styles.subNav}>
              <li>
                <NavLink to="cast" className={buildLinkClass}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={buildLinkClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>

          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </>
      )}
    </main>
  );
};

export default MovieDetailsPage;
