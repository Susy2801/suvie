import { Routes, Route } from "react-router-dom";
import MyContext from "./API Generate/ApiContext.js";
import { useState, useEffect } from "react";
import Saved from "./Phimmoi Component/Movie.js";
import Header from "./Header Component/Header.js";
import HomePage from "./Home Component/Home.js";
import WatchPage from "./Watch Component/Watch.js";
import "./Style/Loading.css";
import "./App.css";

function App() {
  const [movieData, setData] = useState([]);
  const [eachData, setEachData] = useState([]);
  useEffect(() => {
    fetch("https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1")
      .then((response) => response.json())
      .then((data) => {
        const movieList = data.items;
        setData(movieList);
      });
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const eachMovie = await Promise.all(
        movieData.map(async (movie) => {
          const slug = movie.slug;
          const response = await fetch(`https://ophim1.com/phim/${slug}`);
          const data = await response.json();
          return data;
        })
      );
      setEachData(eachMovie);
    };

    fetchMovies();
  }, [movieData]);
  return (
    <div className="App">
      <Header />
      <MyContext.Provider value={{ eachData, movieData }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playlist" element={<Saved />} />
          <Route path="/watch/:id" element={<WatchPage />} />
        </Routes>
      </MyContext.Provider>
    </div>
  );
}

export default App;
