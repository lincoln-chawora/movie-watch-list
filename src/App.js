import {useState} from "react";
import Loader from "./components/Loader";
import WatchedSummary from "./components/WatchedSummary";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import {useMovies} from "./hooks/useMovies";
import {useLocalStorageState} from "./hooks/useLocalStorageState";
import {NavBar, NumOfResults, Search} from "./components/Header";

export default function App() {
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState( null);
    const {movies, isLoading, error} = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], 'watched');

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
