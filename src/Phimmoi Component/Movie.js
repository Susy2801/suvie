import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Movie.css";
function Saved() {
  const [movie, setMovie] = useState([]);
  const [height, setHeight] = useState(null);
  const [top, setTop] = useState("-100px");
  const [remove, setRemove] = useState("");

  var list = localStorage.getItem("playlist");
  list = JSON.parse(list);

  useEffect(() => {
    if (list) {
      for (const slug of list) {
        async function getMovie() {
          var json = await fetch(`https://ophim1.com/phim/${slug}`);
          var data = await json.json();
          setMovie((prev) => [...prev, data]);
        }
        getMovie();
      }
    }
  }, []);

  var onHover = (index) => {
    setHeight(index);
  };

  const removeMovie = (slug) => {
    alert("XÓA PHIM");
    setRemove(slug);
  };

  useEffect(() => {
    if (remove !== "") {
      var filteredList = movie.filter((item) => item.movie.slug !== remove);
      setMovie(filteredList);
      var updatedList = list.filter((name) => name !== remove);
      localStorage.setItem("playlist", JSON.stringify(updatedList));
      setRemove("");
    }
  }, [remove]);
  if (list && list.length > 0) {
    return (
      <div className="playlist__box">
        {movie.map((info, index) => {
          var movie = info.movie;
          return (
            <div
              key={index}
              className="playlist__item"
              onMouseEnter={() => onHover(index)}
              onMouseLeave={() => {
                setHeight(null);
                setTop("-40px");
              }}
            >
              <img src={movie.thumb_url} alt="poster" />
              <div
                className="remove__playlist"
                style={{ top: height === index ? 0 : "-100px" }}
                onClick={() => removeMovie(movie.slug, index)}
              >
                <i className="fa-solid fa-minus"></i>
              </div>
              <div
                className="playlist__info"
                style={{
                  height: height === index ? "120px" : 0,
                }}
              >
                <h1>{movie.name}</h1>
                <Link to={`/watch/${movie.slug}`} className="playlist__btn">
                  Xem phim
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="loading__screen">
        <div>Không có phim nào trong bộ sưu tập!</div>
      </div>
    );
  }
}

export default Saved;
