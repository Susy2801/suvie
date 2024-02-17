import { Routes, Route } from "react-router-dom";
import Movie from "./Phimmoi Component/Movie.js";
import Header from "./Header Component/Header.js";
import HomePage from "./Home Component/HomeRender.js";
import WatchPage from "./Watch Component/Watch.js";
import "./Style/Loading.css";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phimmoi" element={<Movie />} />
        <Route path="/watch/:id" element={<WatchPage />} />
      </Routes>
    </div>
  );
}

export default App;
