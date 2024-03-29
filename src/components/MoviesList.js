import MovieCard from "./MovieCard";

export default function MoviesList({movies, isWatched = false, onSelectMovie, onRemoveMovie}) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie}>
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
                                <span>{movie.runtime}</span>
                            </p>

                            <button onClick={(e) => onRemoveMovie(e, movie.imdbID)} className="btn-delete">X</button>
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