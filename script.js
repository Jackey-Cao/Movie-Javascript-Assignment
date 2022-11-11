function movie_selector() {
  for (let i = 0; i < 10; i++) {
    if (document.getElementById("movies").selectedIndex == i) {
      return document.getElementById("movies").value
    }
  }
};

button.addEventListener('click', async () => {
  let response = axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "e8016904e176c4cc2f25acfd19077f5c",
      include_adult: "false",
      query: movie_selector(),
    }
  });
  response = response.then((moviesData) => {
    for (let movie of moviesData.data.results) {
      axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
          api_key: "e8016904e176c4cc2f25acfd19077f5c",
          append_to_response: "videos",
        }
      }).then((movieData) => {

        let option = movieData.data

        const screen = document.getElementById('screen');
        screen.removeAttribute('hidden')

        let genres = "";
        option.genres.forEach(element => {
          genres += element.name + " "
        });
        
        title = document.getElementById("title");
        title.innerHTML = `${option.title}`;
        genre = document.getElementById("genre");
        genre.innerHTML = `Genre: ${genres}`;
        runtime = document.getElementById("runtime");
        runtime.innerHTML = `Run Time (Mins): ${option.runtime}`;
        language = document.getElementById("language");
        language.innerHTML = `Language: ${option.original_language}`;
        releasedate = document.getElementById("releasedate");
        releasedate.innerHTML = `Released Date: ${option.release_date}`;
        popularity = document.getElementById("popularity");
        popularity.innerHTML = `Popularity: ${option.popularity}`;
        revenue = document.getElementById("revenue");
        revenue.innerHTML = `Revenue: $${option.revenue}`;
        avgvote = document.getElementById("avgvote");
        avgvote.innerHTML = `Average Vote: ${option.vote_average}`;
        votecount = document.getElementById("votecount");
        votecount.innerHTML = `Vote Count: ${option.vote_count}`;
        overview = document.getElementById("overview");
        overview.innerHTML = `${option.overview}`;

        const trailers = option.videos.results.filter((trailer) => trailer.type === "Trailer");
        video.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
        cover.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      });
    }
  });
});