import movieReducer from "../features/movie/movieSlice";
import {configureStore} from "@reduxjs/toolkit";
import {api} from "../features/api/apiSlice";

const store = configureStore({
    reducer: {
        movie: movieReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
});

export default store;