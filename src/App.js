import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
    const [watched, setWatched] = useState(tempWatchedData);
    const [movies, setMovies] = useState(tempMovieData);

    return (
        <>
            <NavBar>
                <NumOfResults movies={movies} />
            </NavBar>

            <MainContent>
                <Box>
                    <MoviesList movies={movies} />
                </Box>

                <Box>
                    <WatchedSummary watched={watched} />
                    <MoviesList movies={watched} isWatched={true} />
                </Box>
            </MainContent>
        </>
    );
}

function NavBar({children}) {
  return (
      <nav className="nav-bar">
          <Logo />
          <Search />
          {children}
      </nav>
  )
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    )
}

function Search() {
    const [query, setQuery] = useState("");
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

function NumOfResults({movies}) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

function MainContent({children}) {
    return (
        <main className="main">
            {children}
        </main>
    )
}

function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <ToggleButton onClick={() => setIsOpen((open) => !open)}>{isOpen ? "–" : "+"}</ToggleButton>
            {isOpen && children}
        </div>
    )
}

function ToggleButton({children, onClick}) {
    return (
        <button
            className="btn-toggle"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

function MoviesList({movies, isWatched = false}) {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie}>
                    {isWatched ?
                        <div>
                            <p>
                                <span>⭐️</span>
                                <span>{movie.imdbRating}</span>
                            </p>
                            <p>
                                <span>🌟</span>
                                <span>{movie.userRating}</span>
                            </p>
                            <p>
                                <span>⏳</span>
                                <span>{movie.runtime} min</span>
                            </p>
                        </div> :

                        <div>
                            <p>
                                <span>🗓</span>
                                <span>{movie.Year}</span>
                            </p>
                        </div>
                    }

                </MovieCard>
            ))}
        </ul>
    )
}

function MovieCard({movie, children}) {
    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>

            {children}
        </li>
    )
}

function WatchedSummary({watched}) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    const watchedInfo = [
        {
            emoji: '#️⃣',
            value: watched.length,
        },
        {
            emoji: '⭐️',
            value: avgImdbRating
        },
        {
            emoji: '🌟️',
            value: avgUserRating
        },
        {
            emoji: '⏳',
            value: avgRuntime
        }
    ]

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <WatchedInfo items={watchedInfo} />
            </div>
        </div>
    )
}

function WatchedInfo({items}) {
    return (
        <>
            {items.map((item, idx) => (
                <WatchInfoItem key={idx} value={item.value} emoji={item.emoji} />
            ))}
        </>
    )
}

function WatchInfoItem({value, emoji}) {
    return (
        <p>
            <span>{emoji}️</span>
            <span>{value}</span>
        </p>
    )
}
