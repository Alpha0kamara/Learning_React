import { useState, useEffect } from "react";
// a4ce8493

import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
const API_URL = "http://www.omdbapi.com?apikey=a4ce8493";
//testen van movie api
const movie1 = {
  Title: "Shrek Forever After",
  Year: "2010",
  imdbID: "tt0892791",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMTY0OTU1NzkxMl5BMl5BanBnXkFtZTcwMzI2NDUzMw@@._V1_SX300.jpg",
};

const App = () => {

    //states
  const [movies, setMovies] = useState([]);
  //zoekopdrachten
  const [searchTerm, setSearchTerm] = useState('');

  //zoeken van films
  const searchMovies = async (title) => {
    const responsse = await fetch(`${API_URL}&s=${title}`);
    const data = await responsse.json();

    //setstate vullen aan de aan van api url aanvraag
    setMovies(data.Search);
  };

  //useffect is zelde als componentdidmount bij opstarten wordt dat uitgevoerd
  useEffect(() => {
    searchMovies({searchTerm});
  }, []);
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
