import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Search() {
  const [movie, setMovie] = useState([]);
  const [height, setHeight] = useState(null);
  const [top, setTop] = useState("-100px");
  const { id } = useParams();
  console.log(movie);
  var onHover = (index) => {
    setHeight(index);
  };

  useEffect(() => {
    async function searchAPI() {
      var response = await fetch(
        `https://ophim1.com/v1/api/tim-kiem?keyword=${id}`
      );
      var data = await response.json();
      console.log(data);
      setMovie(data.data.items);
    }

    searchAPI();
  }, []);

  return (
    <div>
      <div className="playlist__box">
        {movie.map((movie, index) => {
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
              <img
                src={`https://img.ophim12.cc/uploads/movies/${movie.thumb_url}`}
                alt="poster"
              />

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
    </div>
  );
}

export default Search;
