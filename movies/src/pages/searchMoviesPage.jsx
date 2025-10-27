import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SearchMoviesPage = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["search", { query }],
    queryFn: searchMovies,
    enabled: query.trim().length >= 2,
  });

  const movies = data?.results || [];

  const handleChange = (e) => {
    const v = e.target.value;
    if (v) setParams({ q: v });
    else setParams({});
  };

  return (
    <>
      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
          Search Movies
        </Typography>
        <TextField
          fullWidth
          id="search-movies-input"
          label="Type at least 2 characters"
          variant="outlined"
          value={query}
          onChange={handleChange}
        />
      </Box>

      {query.trim().length < 2 ? (
        <Box sx={{ px: 2, py: 4 }}>
          <Typography variant="body1">
            Enter at least two characters to search TMDB.
          </Typography>
        </Box>
      ) : isPending ? (
        <Spinner />
      ) : isError ? (
        <h1>{error.message}</h1>
      ) : (
        <PageTemplate
          title={`Results for "${query}"`}
          movies={movies}
          action={(movie) => <AddToFavoritesIcon movie={movie} />}
        />
      )}
    </>
  );
};

export default SearchMoviesPage;
