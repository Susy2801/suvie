import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Watch.css";

function Watch() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [link, setLink] = useState("");
  console.log(data);
  useEffect(() => {
    fetch(`https://ophim1.com/phim/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [id]);
  if (Object.keys(data).length > 0) {
    const movieLink = data.episodes[0].server_data[0].link_embed;
    const thumb = data.movie.thumb_url;
    const name = data.movie.name;
    const subName = data.movie.origin_name;
    const type = data.movie.category[0].name;
    const player = data.movie.director[0];
    const actor = data.movie.actor.map((actor) => actor).join(", ");
    const des = data.movie.content;
    const year = data.movie.year;
    // Tập phim
    const eps = data.episodes[0].server_data;

    return (
      <div className="watch__main">
        <div className="screen__container">
          <iframe
            allowFullScreen
            title="Phim hay"
            className="screen"
            src={movieLink}
          ></iframe>
        </div>
        <div className="watch__episodes">
          <div className="eps__title">Chọn tập phim</div>
          <div className="eps__btn--container">
            {eps.map((item, index) => {
              const link = item.link_embed;

              return (
                <button
                  key={index}
                  className="eps__btn"
                  onClick={() => setLink(link)}
                >
                  Tập {parseInt(index + 1)}
                </button>
              );
            })}
          </div>
        </div>
        <div className="watch-info">
          <img className="watch_thumb" src={thumb} alt="ảnh phim" />
          <div className="watch__info--left">
            <h2 className="watch__movie--title">{name}</h2>
            <h2 className="watch__movie--sub">{subName}</h2>
            <h2 className="watch__movie--year">
              <span>Phát hành:</span> {year}
            </h2>
            <h2 className="watch__movie--type">
              <span>Thể loại:</span> {type}
            </h2>
            <h2 className="watch__movie--player">
              <span>Đạo diễn:</span>
              {player}
            </h2>
            <h2 className="watch__movie--actor">
              <span>Nghệ sĩ:</span> {actor}
            </h2>
            <h2 className="watch__movie--des">
              {des.replace(/<\/?p>|<br\/?>/g, "")}
            </h2>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loading__screen">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Watch;
