import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMoviePage";
import MovieCredits from "../components/movieCredits";

const MovieCreditsPage = () => {
  const { id } = useParams();

  const {data: movie, error: movieError, isPending: moviePending, isError: movieIsError,} = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  const {data: credits, error: credError, isPending: credPending, isError: credIsError,} = useQuery({
    queryKey: ["credits", { id }],
    queryFn: getMovieCredits,
  });

  if (moviePending || credPending) return <Spinner />;
  if (movieIsError) return <h1>{movieError.message}</h1>;
  if (credIsError) return <h1>{credError.message}</h1>;

  const cast = credits.cast || [];

  return (
    <PageTemplate movie={movie}>
      <MovieCredits cast={cast} />
    </PageTemplate>
  );
};

export default MovieCreditsPage;
