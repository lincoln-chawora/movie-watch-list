import {useEffect, useState} from "react";
import Loader from "./components/Loader";
import WatchedSummary from "./components/WatchedSummary";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";

const KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function App() {
    const [watched, setWatched] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState( null);

    function handleSelectMovie(id) {
        setSelectedId(prevId => prevId === id ? null : id);
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched(watched => [...watched, movie]);
    }

    function handleDeleteWatched(e, id) {
        // This prevents the card click from also being triggered.
        e.stopPropagation();

        setWatched((items) => (
            items.filter((item) => item.imdbID !== id)
        ));
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true)
                setError('');
                // Fetch query data from api.
                const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});

                if (!response.ok) throw new Error('Something went wrong with fetching movies.');

                // Get json data from api response.
                const data = await response.json();

                if (data.Response === 'False') throw new Error('Movie not found.');

                // Save searched data into movies state.
                setMovies(data.Search);
                setError('');
            } catch (e) {
                if(e.name !== 'AbortError') {
                    setError(e.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([])
            setError('')
            return;
        }

        fetchMovies();

        return function () {
            controller.abort();
        }
    }, [query]);

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <NumOfResults movies={movies} />
            </NavBar>

            <MainContent>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MoviesList movies={movies} onSelectMovie={handleSelectMovie} /> }
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    { selectedId ? <MovieDetails
                                watched={watched}
                                selectedId={selectedId}
                                onClose={handleCloseMovie}
                                onAddWatched={handleAddWatched}/>
                        :
                        <>
                            <WatchedSummary watched={watched}/>
                            <MoviesList movies={watched} onRemoveMovie={handleDeleteWatched} isWatched={true} onSelectMovie={handleSelectMovie} />
                        </>
                    }
                </Box>
            </MainContent>
        </>
    );
}

function ErrorMessage({message}) {
    return (
        <p className="error">
            <span>⛔️</span> {message}
        </p>
    )
}

function NavBar({children}) {
  return (
      <nav className="nav-bar">
          <Logo />
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

function Search({query, setQuery}) {

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
