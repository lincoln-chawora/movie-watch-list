import {useEffect} from "react";

export function useKey(key, callback) {
    useEffect(() => {
        function callBack(e) {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                callback();
            }
        }
        document.addEventListener('keydown', callBack);

        return function () {
            document.removeEventListener('keydown', callBack);
        }
    }, [key, callback]);
}