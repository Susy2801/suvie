import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import logo from "../logo.png";

function Header() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("0px");

  function openSearch() {
    if (show === "0px") {
      setShow("250px");
    } else setShow("0px");
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
          style={{ width: show }}
          placeholder="Tìm kiếm phim"
          value={search}
          onBlur={() => openSearch()}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i
          className="fa-solid fa-magnifying-glass search-icon"
          onClick={() => openSearch()}
        ></i>
      </div>
    </header>
  );
}

export default Header;
