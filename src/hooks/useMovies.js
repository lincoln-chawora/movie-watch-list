import {useEffect, useState} from "react";

const KEY = process.env.REACT_APP_OMDB_API_KEY;

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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

    return {movies, isLoading, error};
}