import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Search() {
  const [movie, setMovie] = useState([]);
  const [height, setHeight] = useState(null);
  const [top, setTop] = useState("-100px");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  console.log(movie);
  var onHover = (index) => {
    setHeight(index);
  };

  useEffect(() => {
    async function searchAPI() {
      var response = await fetch(
        `https://ophim1.com/v1/api/tim-kiem?keyword=${id}`
      );
      setLoading(false);
      var data = await response.json();
      setMovie(data.data.items);
      setLoading(true);
    }

    searchAPI();
  }, [id]);
  var isFound = movie.length !== 0;
  if (isFound) {
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
  } else {
    return loading ? (
      <div className="loading__screen">
        <div>KHÔNG TÌM THẤY PHIM!</div>
      </div>
    ) : (
      <div className="loading__screen">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Search;
