import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";
import { getMoviesPage } from "../api/tmdb-api";
import { useSearchParams } from "react-router";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover", { page }],
    queryFn: getMoviesPage,
    keepPreviousData: true,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results || [];
  const totalPages = Math.min(data.total_pages || 1, 500);

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => (
          <>
            <AddToFavoritesIcon movie={movie} />
            <MustWatchToggleIcon movie={movie} />
          </>
        )}
      />
      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setSearchParams({ page: String(value) })}
          color="primary"
          shape="rounded"
        />
      </Box>
    </>
  );
};

export default HomePage;
