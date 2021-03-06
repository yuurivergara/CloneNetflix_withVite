import React, {useState} from "react";
import "./movieRow.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { width } from "@mui/system";

export default ({title, items}) => {
const [ScrollX, setScrolX] = useState(0);

  const leftArrow = () => {
    let x = ScrollX + Math.round(window.innerWidth / 2);
    if (x>0) {
      x=0;
    }
    setScrolX(x);
  }
  const rightArrow = () => {
    let x = ScrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if(window.innerWidth - listW > x) {
      x= (window.innerWidth - listW) - 60;
    }
    setScrolX(x);
  }
  return ( 
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movierow--left" onClick={leftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}} />
      </div>
      <div className="movierow--right" onClick={rightArrow}>
        <NavigateNextIcon style={{fontSize: 50}} />
      </div>
      <div className="movieRow--listarea">
          <div className="movieRow--list" style={{
            marginLeft: ScrollX,
            width: items.results.length * 150
          }}>
            {items.results.length > 0 && items.results.map((item, key) =>(
            <div key={key} className="movieRow--item">
              <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} />
            </div>
            ))}
          </div>
      </div>
    </div>
    )
};