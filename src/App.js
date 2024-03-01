import { Routes, Route } from "react-router-dom";
import MyContext from "./API Generate/ApiContext.js";
import { useState, useEffect } from "react";
import Saved from "./Phimmoi Component/Movie.js";
import Header from "./Header Component/Header.js";
import HomePage from "./Home Component/Home.js";
import WatchPage from "./Watch Component/Watch.js";
import SearchPage from "./Search Page/Search.js";
import CategoryPage from "./Movie Category/Category.js";
import "./Style/Loading.css";
import "./App.css";

function App() {
  const [movieUpdate, setData] = useState([]);
  const [movieBySlug, setEachData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch("https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1", {
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((data) => {
        const movieList = data.items;
        setData(movieList);
      })
      .catch((error) => console.log(`Lỗi: ${error}`));
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMovies = async () => {
      const eachMovie = await Promise.all(
        movieUpdate.map(async (movie) => {
          try {
            const slug = movie.slug;
            const response = await fetch(`https://ophim1.com/phim/${slug}`, {
              signal: abortController.signal,
            });
            const data = await response.json();
            return data;
          } catch (error) {
            console.error(`Lỗi slug API: ${error}`);
          }
        })
      );
      setEachData(eachMovie);
    };

    fetchMovies();
    return () => {
      abortController.abort();
    };
  }, [movieUpdate]);
  return (
    <div className="App">
      <Header />
      <MyContext.Provider value={{ movieBySlug, movieUpdate }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playlist" element={<Saved />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/search/:id" element={<SearchPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
        </Routes>
      </MyContext.Provider>
    </div>
  );
}

export default App;
