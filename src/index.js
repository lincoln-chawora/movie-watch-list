import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import StarRating from './components/StarRating';
import reportWebVitals from './reportWebVitals';

function Test() {
    const [movieRating, setMovieRating] = useState(0)
    return (
        <div>
            <StarRating maxRating={5} onSetRating={setMovieRating} />
            <p>The rating is {movieRating} stars</p>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <StarRating maxRating={5} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRating={3} />
      <Test />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
