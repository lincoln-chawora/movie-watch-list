export default function MovieCard({movie, children, onSelectMovie}) {
    const {
        Title: title,
        Poster: poster,
        imdbID
    } = movie;

    return (
        <li onClick={() => onSelectMovie(imdbID)}>
            <img src={poster} alt={`${title} poster`} />
            <h3>{title}</h3>
            {children}
        </li>
    )
}