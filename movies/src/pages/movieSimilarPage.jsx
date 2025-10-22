import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const MovieSimilarPage = () => {
  const { id } = useParams();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["similar", { id }],
    queryFn: getSimilarMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Similar Movies"
      movies={movies}
      action={() => null}
    />
  );
};

export default MovieSimilarPage;
