import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../logo.png";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [preSearch, setPreSearch] = useState([]);
  const [preHeight, setPreHeight] = useState(0);

  function handleEnter(e) {
    if (e.key === "Enter") {
      navigate(`search/${search}`, { replace: true });
      setSearch("");
    }
  }

  function updatePreHeight() {
    setPreHeight("500px");
  }

  function checkInput() {
    if (search == "") {
      offPreHeight();
    }
  }

  function offPreHeight() {
    setPreHeight("0");
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function getCategory() {
      var response = await fetch("https://ophim1.com/v1/api/the-loai", {
        signal: abortController.signal,
      });
      var data = await response.json();
      console.log(data);
      var categoryData = await data.data.items;
      setCategory(categoryData);
    }
    getCategory();
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    var api = `https://ophim1.com/v1/api/tim-kiem?keyword=${search}`;
    var searchPre = async () => {
      var response = await fetch(api);
      var data = await response.json();
      setPreSearch(data.data.items);
      console.log(preSearch);
    };

    searchPre();
  }, [search]);

  return (
    <header className="header">
      <div className="header__right">
        <img className="header__logo" src={logo} alt="ảnh logo" />
        <nav className="nav">
          <Link to="/" className="nav_a">
            Trang chủ
          </Link>
          <Link to="/playlist" className="nav_a">
            Bộ sưu tập
          </Link>
          <div
            className="header__type--box"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <Link className="nav_a type">Thể Loại</Link>
            <div
              className="header__cataloge"
              style={{ height: show ? "auto" : 0 }}
            >
              {category.map((category, index) => (
                <Link
                  to={`/category/${category.slug}`}
                  key={index}
                  className="cataloge__item"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
      <div className="search">
        <input
          placeholder="Tìm kiếm phim"
          value={search}
          onBlur={(e) => offPreHeight()}
          onChange={(e) => {
            setSearch(e.target.value);
            updatePreHeight();
            checkInput();
          }}
          onKeyDown={(e) => handleEnter(e)}
        />
        <Link to={`search/${search}`}>
          <i
            onClick={() => setSearch("")}
            className="fa-solid fa-magnifying-glass search-icon"
          ></i>
        </Link>
        <div className="pre__search" style={{ maxHeight: preHeight }}>
          {preSearch.map((movie, index) => (
            <Link className="pre__box" id={index} to={`watch/${movie.slug}`}>
              <img
                className="pre__img"
                alt="img"
                src={`https://img.ophim.live/uploads/movies/${movie.thumb_url}`}
              />
              <div className="pre__info--box">
                <h3 className="pre__name">{movie.name}</h3>
                <h4 className="pre__origin-name">{movie.origin_name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
