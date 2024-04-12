import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const KEY = process.env.REACT_APP_OMDB_API_KEY;

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `http://www.omdbapi.com/`
    }),
    endpoints: (build) => ({
        movieList: build.query({
            query({query}) {
                    return {
                        url: '',
                        params: { apikey: KEY, s: query },
                    }
            }
        }),
        movieDetail: build.query({
            query({id}) {
                return {
                    url: '',
                    params: { apikey: KEY, i: id }  // API key and movie ID both in params
                }
            }
        })
    })
});

export const {useMovieListQuery, useMovieDetailQuery} = api;

