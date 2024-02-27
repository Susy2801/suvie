import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { useContext } from "react";
import ApiContext from "../API Generate/ApiContext";

function Slider1() {
  useEffect(() => {
    async function homeApi() {
      var response = await fetch(`https://ophim1.com//v1/api/home`);
      var data = await response.json();
      console.log(data);
    }
    homeApi();
  }, []);
  const setting1 = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const dataContext = useContext(ApiContext);
  const movie = dataContext.movieBySlug;

  function addPlaylist(slug) {
    let playlist = localStorage.getItem("playlist");

    if (!playlist) {
      playlist = [slug];
    } else {
      playlist = JSON.parse(playlist);
      var found = false;
      for (var i = 0; i < playlist.length; i++) {
        if (playlist[i] === slug) {
          found = true;
          break;
        }
      }
      if (!found) {
        playlist.push(slug);
      }
    }

    localStorage.setItem("playlist", JSON.stringify(playlist));
  }

  if (movie.length > 0) {
    return (
      <div className="home-container">
        <Slider {...setting1}>
          {/* Movie 1 */}
          {movie.map((eachMovie, index) => {
            const movie = eachMovie.movie;
            return (
              <div key={index} className="hero-movie">
                <img src={movie.poster_url} alt="ảnh" className="thumbs" />

                <div className="movie-info">
                  <div className="poster">
                    <img
                      src={movie.thumb_url}
                      alt="ảnh poster"
                      className="poster-img"
                    />
                  </div>
                  <div className="sub-info">
                    <ul>
                      <li>{movie.country[0].name}</li>
                      <li>{movie.category[0].name}</li>
                      <li>{movie.view} Views</li>
                      <li>{movie.year}</li>
                    </ul>
                  </div>
                  <h2 className="movie-title">{movie.name}</h2>
                  <p className="movie-des">
                    {movie.content.replace(/<\/?p>|<br\/?>/g, "")}
                  </p>
                  <div className="episodes">
                    <div className="all-eps">
                      Tổng số tập: <span>{movie.episode_total}</span>
                    </div>
                    <div className="status">
                      Hiện tại: <span>{movie.episode_current}</span>
                    </div>
                  </div>

                  <div className="action__btn">
                    <Link to={`/watch/${movie.slug}`} className="play-btn">
                      <i className="fa-solid fa-play"></i>
                      Watch now
                    </Link>

                    <button
                      className="playlist__btn"
                      onClick={() => addPlaylist(movie.slug)}
                    >
                      Add to playlist +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  } else {
    return (
      <div className="loading__screen">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

function Slider2() {
  // const setting2 = {
  //   dots: true,
  //   arrows: true,
  //   infinite: true,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   speed: 1500,
  //   slidesToShow: 7,
  //   slidesToScroll: 7,
  // };
  const dataContext = useContext(ApiContext);
  const movie = dataContext.movieBySlug;
  if (movie.length > 0) {
    return (
      <div className="Main">
        <h1 className="box-title">Phim mới cập nhật</h1>
        <div className="news-box">
          {/* <Slider {...setting2}> */}
          {movie.map((eachMovie, index) => {
            const movie = eachMovie.movie;
            return (
              <div key={index} className="news-movie">
                <Link to={`/watch/${movie.slug}`}>
                  <div className="news__movie--thumb">
                    <img src={movie.thumb_url} alt="news movie" />
                  </div>
                </Link>
                <div className="news__movie--info">
                  <h2 className="news__movie--name">{movie.name}</h2>
                  <div className="news__movie--sub-info">
                    <ul>
                      <div className="news__year">{movie.year}</div>
                      <li>
                        {" "}
                        <div className="news__year">
                          {movie.country[0].name}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
          {/* </Slider> */}
        </div>
      </div>
    );
  } else {
    return;
  }
}

function Home() {
  return (
    <div>
      <Slider1 />
      <Slider2 />
    </div>
  );
}

export default Home;
