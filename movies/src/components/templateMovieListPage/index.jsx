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
  const [sortOption, setSortOption] = useState("title-asc");

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids?.includes(genreId) : true))
    .filter((m) => (yearFilter ? (m.release_date || "").startsWith(String(yearFilter)) : true))
    .filter((m) => (ratingFilter ? Number(m.vote_average) >= Number(ratingFilter) : true))
    .filter((m) =>
      languageFilter && languageFilter !== "all"
        ? (m.original_language || "").toLowerCase() === languageFilter.toLowerCase()
        : true
    )
    .filter((m) => (voteCountFilter ? Number(m.vote_count) >= Number(voteCountFilter) : true));

  if (sortOption === "title-asc") {
    displayedMovies = [...displayedMovies].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sortOption === "title-desc") {
    displayedMovies = [...displayedMovies].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "language") setLanguageFilter(value);
    else if (type === "votes") setVoteCountFilter(value);
    else if (type === "sort") setSortOption(value);
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
            sortOption={sortOption}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies} />
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
