import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedMovie: null,
    watchedMovies: []
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        select(state, action) {
            state.selectedMovie = action.payload;
        },
        unselect(state) {
            state.selectedMovie = null;
        },
        addToWatchList(state, action) {
            state.watchedMovies = [...state.watchedMovies, action.payload];
            state.selectedMovie = null;
        },
        addRemoteWatchList(state, action) {
            state.watchedMovies = action.payload;
        },
        removeFromWatchList(state, action) {
            state.watchedMovies = state.watchedMovies.filter((item) => item.imdbID !== action.payload);
        }
    }
});

export const {select, unselect, removeFromWatchList, addToWatchList} = movieSlice.actions;

export default movieSlice.reducer;