import {useEffect, useState} from "react";

export function useLocalStorageState(initialState, key) {
    // Use call back function to set watched value using value from local storage. This is called lazy evaluation and is
    // only called on initial render. Must be a pure function and can't use arguments.
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}