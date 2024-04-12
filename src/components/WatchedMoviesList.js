import MovieCard from "./MovieCard";
import {useDispatch, useSelector} from "react-redux";
import {removeFromWatchList} from "../features/movie/movieSlice";

export default function WatchedMoviesList() {
    const {watchedMovies} = useSelector(store => store.movie);
    const dispatch = useDispatch();

    function handleDeleteWatched(e, id) {
        // This prevents the card click from also being triggered.
        e.stopPropagation();

        dispatch(removeFromWatchList(id));
    }

    return (
        <ul className="list list-movies">
            {watchedMovies?.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie}>
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

                        <button onClick={(e) => handleDeleteWatched(e, movie.imdbID)} className="btn-delete">X</button>
                    </div>
                </MovieCard>
            ))}
        </ul>
    )
}