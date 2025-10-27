import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [voteCountFilter, setVoteCountFilter] = useState("");

  const genreId = Number(genreFilter);
  const minRating = ratingFilter === "" ? 0 : Number(ratingFilter);
  const yearText = (yearFilter || "").toString().trim();
  const langCode = (languageFilter || "all").toLowerCase();
  const minVotes = voteCountFilter === "" ? 0 : Number(voteCountFilter);

  let displayedMovies = movies
    .filter((m) => m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1)
    .filter((m) => (genreId > 0 ? m.genre_ids?.includes(genreId) : true))
    .filter((m) => {
      if (!yearText) return true;
      const y = (m.release_date || "").slice(0, 4);
      return y === yearText;
    })
    .filter((m) => Number(m.vote_average || 0) >= minRating)
    .filter((m) => {
      if (langCode === "all") return true;
      return (m.original_language || "").toLowerCase() === langCode;
    })
    .filter((m) => Number(m.vote_count || 0) >= minVotes);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "language") setLanguageFilter(value);
    else if (type === "votes") setVoteCountFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            yearFilter={yearFilter}
            ratingFilter={ratingFilter}
            languageFilter={languageFilter}
            voteCountFilter={voteCountFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
