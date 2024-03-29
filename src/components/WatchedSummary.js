const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({watched}) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    const watchedInfo = [
        {
            emoji: '#️⃣',
            value: watched.length,
        },
        {
            emoji: '⭐️',
            value: avgImdbRating.toFixed(2)
        },
        {
            emoji: '🌟️',
            value: avgUserRating.toFixed(2)
        },
        {
            emoji: '⏳',
            value: avgRuntime
        }
    ]

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <WatchedInfo items={watchedInfo} />
            </div>
        </div>
    )
}

function WatchedInfo({items}) {
    return (
        <>
            {items.map((item, idx) => (
                <WatchInfoItem key={idx} value={item.value} emoji={item.emoji} />
            ))}
        </>
    )
}

function WatchInfoItem({value, emoji}) {
    return (
        <p>
            <span>{emoji}️</span>
            <span>{value}</span>
        </p>
    )
}