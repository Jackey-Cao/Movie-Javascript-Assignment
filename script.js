function getFunction() {
  let selectedValue = document.getElementById("movies").value;
  console.log(selectedValue);
}

button.addEventListener('click', async () => {

  let response = axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "e8016904e176c4cc2f25acfd19077f5c",
      include_adult: "false",
      query: getFunction(),
    }
  });
  response = response.then((moviesData) => {
    for (let movie of moviesData.data.results) {
      axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
          api_key: "779ebe30f392f779f18a739e5df2f414",
          append_to_response: "videos",
        }
      }).then((movieData) => {
        const info = document.getElementById('info');
        const img = document.getElementById('img');
        const p = document.getElementById('p');
        const iframe = document.getElementById('iframe');

        const trailers = movieData.data.videos.results.filter((trailer) => trailer.type === "Trailer");
        iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        p.innerHTML = `${movie.title} -- ${movie.release_date} -- ${movie.popularity}`;
        

        
        document.body.append(p);
        document.body.append(img);
        document.body.append(iframe);
      });
    }
  });
})