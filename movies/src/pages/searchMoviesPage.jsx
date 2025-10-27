import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { useQuery } from "@tanstack/react-query";
import { getSearchMovies } from "../api/tmdb-api";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";

const MIN_LEN = 2;

const SearchMoviesPage = () => {
  const [q, setQ] = useState("");

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["search", { q }],
    queryFn: getSearchMovies,
    enabled: q.trim().length >= MIN_LEN,
    placeholderData: { results: [] },
    retry: false,
  });

  const movies = (data && data.results) || [];

  return (
    <>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Search TMDB"
          variant="outlined"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          helperText={
            q.trim().length < MIN_LEN
              ? `Type at least ${MIN_LEN} characters to search`
              : ""
          }
        />
      </Box>

      {q.trim().length >= MIN_LEN && isPending ? (
        <Spinner />
      ) : isError ? (
        <h1>{error.message}</h1>
      ) : (
        <PageTemplate
          title="Search Results"
          movies={movies}
          action={(movie) => (
            <>
              <AddToFavoritesIcon movie={movie} />
              <MustWatchToggleIcon movie={movie} />
            </>
          )}
        />
      )}
    </>
  );
};

export default SearchMoviesPage;
