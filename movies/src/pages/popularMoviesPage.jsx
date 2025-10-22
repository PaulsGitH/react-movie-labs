import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { useQuery } from "@tanstack/react-query";
import { getPopular } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const PopularMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopular,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default PopularMoviesPage;
