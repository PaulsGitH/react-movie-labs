import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { useQuery } from "@tanstack/react-query";
import { getTopRated } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";


const TopRatedMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["top_rated"],
    queryFn: getTopRated,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => (
        <>
          <AddToFavoritesIcon movie={movie} />
          <MustWatchToggleIcon movie={movie} />
        </>
      )}
    />
  );
};

export default TopRatedMoviesPage;
