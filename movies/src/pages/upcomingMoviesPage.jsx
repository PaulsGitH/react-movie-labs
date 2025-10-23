import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAdd from "../components/cardIcons/playlistAdd";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";

const UpcomingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results || [];

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => (
        <>
          <PlaylistAdd movie={movie} />
          <MustWatchToggleIcon movie={movie} />
        </>
      )}
    />
  );
};

export default UpcomingMoviesPage;
