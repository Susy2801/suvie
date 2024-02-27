import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../logo.png";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleEnter(e) {
    if (e.key === "Enter") {
      navigate(`search/${search}`);
      setSearch("");
    }
  }

  return (
    <header className="header">
      <div className="header__right">
        <img className="header__logo" src={logo} alt="ảnh logo" />

        <nav className="nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/playlist">Bộ sưu tập</Link>
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
