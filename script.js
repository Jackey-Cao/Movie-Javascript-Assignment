function selectFunction() {
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
      query: selectFunction(),
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

        const display = document.getElementById('display');
        display.removeAttribute('hidden')
        
        const trailers = option.videos.results.filter((trailer) => trailer.type === "Trailer");
        video.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
        cover.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        let genres = "";
        option.genres.forEach(element => {
          genres += element.name + " "
        });

        info.innerHTML = `Title: ${option.title} <br><br> 
        Genre: ${genres} <br><br> 
        Language: ${option.original_language} <br>
        Runtime (Minutes): ${option.runtime} <br>
        Release Date: ${option.release_date} <br> 
        Popularity: ${option.popularity} <br> 
        Revenue: $${option.revenue} <br> 
        Vote Average: ${option.vote_average} <br> 
        Vote Count: ${option.vote_count}`;
        overviewLabel.innerHTML = "Preview";
        overviewText.innerHTML = `${option.overview}`;
      });
    }
  });
});