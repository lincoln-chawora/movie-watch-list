import {useEffect, useState} from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function MovieDetails({selectedId, onClose, onAddWatched, watched}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0)

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

    const {
        Title: title,
        Year: year,
        Poster,
        Runtime: runtime,
        imdbRating,
        Plot, plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre, genre,
    } = movie;

    useEffect(() => {
        async function getMovie(id) {
            try {
                setIsLoading(true)
                const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
                const data = await response.json();
                setMovie(data);
                setIsLoading(false)
            } catch (e) {
                console.log('Error: ', e);
            }
        }

        getMovie(selectedId);

        //movieHasBeenWatched(selectedId)

    }, [selectedId])

    // Set page title.
    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;

        // Clean up effect. (this runs after the component with title is unmounted)
        return function () {
            document.title = 'usePopcorn';
        }
    }, [title])

    useEffect(() => {
        function callBack(e) {
            if (e.code === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', callBack);

        return function () {
            document.removeEventListener('keydown', callBack);
        }
    }, [onClose]);

    function movieHasBeenWatched(id) {
        const movie = watched.filter((item) => item.imdbID === id);
    }

    function handleAddMovie() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            Poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating
        }

        onAddWatched(newWatchedMovie)
        onClose()
    }

    function handleRatingMovie(rating) {
        setUserRating(rating);
    }

    return (
        <div className="details">
            {isLoading ? <Loader/> :
                <>
                    <header>
                        <button className="btn-back" onClick={onClose}>&larr;</button>
                        <img src={Poster} alt={`Poster of ${title} movie`}/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!isWatched ?
                                <>
                                    <StarRating defaultRating={userRating} maxRating={10} size={24}
                                                onSetRating={(rating) => handleRatingMovie(rating)}/>
                                    {userRating > 0 &&
                                        <button className="btn-add" onClick={handleAddMovie}>+ Add to list</button>}
                                </> : <p>You've already watched this movie and rated it {watchedUserRating} ⭐️</p>
                            }
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    )

}