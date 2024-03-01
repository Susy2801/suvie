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

  function handleEnter(e) {
    if (e.key === "Enter") {
      navigate(`search/${search}`, { replace: true });
      setSearch("");
    }
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
            onBlur={() => setShow(false)}
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
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        />
        <Link to={`search/${search}`}>
          <i
            onClick={() => setSearch("")}
            className="fa-solid fa-magnifying-glass search-icon"
          ></i>
        </Link>
      </div>
    </header>
  );
}

export default Header;
