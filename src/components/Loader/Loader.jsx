import css from './Loader.module.css';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className={css.wrapper} role="status" aria-live="polite">
      <span className={css.spinner} aria-hidden="true" />
      <p className={css.text}>{text}</p>
    </div>
  );
};

export default Loader;
