const API_KEY = "c88f4837a5351c2a2e5141083de02c63";
const API_BASE = "https://api.themoviedb.org/3/";

const basicFetch = async (end: string) => {
  const req = await fetch(`${API_BASE}${end}`);
  const json = await req.json();
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Netflix originals",
        items: await basicFetch(
          `discover/tv?with_network=213&language=en&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Recommended for you",
        items: await basicFetch(
          `trending/all/week?api_key=${API_KEY}`
        ),
      },
      {
        slug: "Toprated",
        title: "Top rated",
        items: await basicFetch(
          `movie/top_rated?language=en-US&api_key=${API_KEY}`
        ),
      },
      {
        slug: "action",
        title: "Action",
        items: await basicFetch(
          `discover/movie?with_genres=28&language=en-US&api_key=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "Comedy",
        items: await basicFetch(
          `discover/movie?with_genres=35&language=en&api_key=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "Horror",
        items: await basicFetch(
          `discover/movie?with_genres=27&language=en&api_key=${API_KEY}`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(
          `discover/movie?with_genres=10749&language=en&api_key=${API_KEY}`
        ),
      },
      {
        slug: "documentary",
        title: "Documentary",
        items: await basicFetch(
          `discover/movie?with_genres=99&language=en&api_key=${API_KEY}`
        ),
      },
    ];
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};
    if (movieId) {
      switch(type) {
        case "movie" :
          info = await basicFetch(`/movie/${movieId}?language=en-US&api_key=${API_KEY}`)
        break;
        case "tv":
          info = await basicFetch(`/tv/${movieId}?language=en-US&api_key=${API_KEY}`)
        break;
      }
    }
    return info;
  }
};
