import Home from "./Home.js";
import MyContext from "../API Generate/ApiContext.js";
import { useEffect, useState } from "react";

function HomeRender() {
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
    <MyContext.Provider value={{ eachData, movieData }}>
      <Home />
    </MyContext.Provider>
  );
}

export default HomeRender;
