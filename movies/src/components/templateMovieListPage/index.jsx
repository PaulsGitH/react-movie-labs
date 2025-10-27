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
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids?.includes(genreId) : true;
    })
    .filter((m) => {
      if (!yearFilter) return true;
      if (!m.release_date) return false;
      return m.release_date.slice(0, 4) === String(yearFilter);
    })
    .filter((m) => {
      if (!ratingFilter) return true;
      return Number(m.vote_average) >= Number(ratingFilter);
    })
    .filter((m) => {
      if (!voteCountFilter) return true;
      return Number(m.vote_count) >= Number(voteCountFilter);
    })
    .filter((m) => {
      if (!languageFilter || languageFilter === "all") return true;
      return (m.original_language || "").toLowerCase() ===
        String(languageFilter).toLowerCase();
    });

  if (sortOption === "title-asc") {
    displayedMovies = [...displayedMovies].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sortOption === "title-desc") {
    displayedMovies = [...displayedMovies].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  } else if (sortOption === "date-newest") {
    displayedMovies = [...displayedMovies].sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
  } else if (sortOption === "date-oldest") {
    displayedMovies = [...displayedMovies].sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
  } else if (sortOption === "rating-high") {
    displayedMovies = [...displayedMovies].sort(
      (a, b) => Number(b.vote_average) - Number(a.vote_average)
    );
  } else if (sortOption === "rating-low") {
    displayedMovies = [...displayedMovies].sort(
      (a, b) => Number(a.vote_average) - Number(b.vote_average)
    );
  } else if (sortOption === "popularity-high") {
    displayedMovies = [...displayedMovies].sort(
      (a, b) => Number(b.popularity) - Number(a.popularity)
    );
  } else if (sortOption === "popularity-low") {
    displayedMovies = [...displayedMovies].sort(
      (a, b) => Number(a.popularity) - Number(b.popularity)
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
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
