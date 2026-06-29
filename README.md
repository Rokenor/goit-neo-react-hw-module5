# Movies Search

Застосунок із маршрутизацією для пошуку фільмів за назвою через [TMDB API](https://developer.themoviedb.org/). Показує трендові фільми, дозволяє шукати за ключовим словом і переглядати детальну інформацію з акторським складом та оглядами.

## Можливості

- Домашня сторінка зі списком трендових фільмів (`GET /trending/movie/{time_window}`)
- Пошук фільмів за ключовим словом (`GET /search/movie`) із збереженням запиту в URL (`useSearchParams`)
- Сторінка деталей фільму (`GET /movie/{movie_id}`) з постером, рейтингом, жанрами та описом
- Вкладені маршрути: акторський склад (`GET /movie/{movie_id}/credits`) та огляди (`GET /movie/{movie_id}/reviews`)
- Кнопка **Go back** — повернення на сторінку, з якої відкрили деталі (через `useRef` + `location.state`)
- Індикатори завантаження та повідомлення про помилки на кожній сторінці
- Сторінка **404** (NotFoundPage) для неіснуючих маршрутів
- Асинхронне завантаження коду маршрутів (`React.lazy` + `Suspense`)

## Технології

React 19, Vite, React Router, axios, clsx, CSS Modules

## Маршрути

| Шлях                       | Компонент          | Опис                                |
| -------------------------- | ------------------ | ----------------------------------- |
| `/`                        | `HomePage`         | Список трендових фільмів            |
| `/movies`                  | `MoviesPage`       | Пошук фільмів за ключовим словом    |
| `/movies/:movieId`         | `MovieDetailsPage` | Детальна інформація про фільм       |
| `/movies/:movieId/cast`    | `MovieCast`        | Акторський склад (вкладений маршрут) |
| `/movies/:movieId/reviews` | `MovieReviews`     | Огляди (вкладений маршрут)          |
| `*`                        | `NotFoundPage`     | Сторінка для неіснуючих маршрутів   |

## Структура компонентів

```
src/
├── components/
│   ├── App/           — конфіг маршрутизації, React.lazy + Suspense
│   ├── Navigation/    — навігаційне меню (NavLink на / та /movies)
│   ├── MovieList/     — список фільмів (Link зі збереженням location у state)
│   ├── MovieCast/     — акторський склад фільму
│   └── MovieReviews/  — огляди фільму
├── pages/
│   ├── HomePage/          — трендові фільми
│   ├── MoviesPage/        — пошук фільмів
│   ├── MovieDetailsPage/  — деталі фільму з вкладеною навігацією
│   └── NotFoundPage/      — сторінка 404
└── services/
    └── api.js         — axios-клієнт TMDB
```

## Запуск

```bash
npm install
```

Створи файл `.env` і додай свій TMDB Read Access Token:

```env
VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
```

```bash
npm run dev
```

## Скрипти

- `npm run build` — Збірка продакшн-версії
- `npm run preview` — Перегляд зібраної версії
- `npm run lint` — Перевірка ESLint
