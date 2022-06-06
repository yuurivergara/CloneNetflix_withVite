import Reac,{ useEffect, useState } from "react";
import Requisicao from "./Requisicao";
import MovieRow from "./components/movieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import "./App.css"

export default () => {
  const [movieList, setMovieList]  = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista
      let list = await Requisicao.getHomeList();
      setMovieList(list);

      //Pegando o featured
      let originals = list.filter(i=>i.slug === "originals");
      let random = Math.floor(Math.random() * (originals[0].items.results.length -1)) ;
      let chosen = originals[0].items.results[random];
      let chosenInfo = await Requisicao.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollMonitor = () => {  /* Monitora o scroll */ 
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {                                              
        setBlackHeader(false);
      }
    }
    return () => {
      window.addEventListener("scroll", scrollMonitor);
    }
  },[]);

  return (
    <div className="page">
      <Header  black={blackHeader}/>

      {FeaturedData &&
        <FeaturedMovie item={FeaturedData}/>
      }

      <section className="lists">
        {movieList.map((item , key)=>(
          <MovieRow key={key} title={item.title} items = {item.items} />
      ))}
      </section>
      <footer>
        Feito por Yuri Vergara <br />
        Direitos de imagem para Netflix <br />
        Dados pegos pelo site themoviedb.org  
      </footer>
      {movieList.length <=0 &&
      <div className="loading">
        <img src="https://c.tenor.com/Rfyx9OkRI38AAAAC/netflix-netflix-startup.gif" alt="Loading" />
      </div>
      }
    </div>
  );

};
