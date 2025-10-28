import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCompany, getCompanyMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";

const CompanyDetailsPage = () => {
  const { id } = useParams();

  const {
    data: company,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["company", { id }],
    queryFn: getCompany,
  });

  const {
    data: companyMovies,
    error: moviesError,
    isPending: moviesPending,
    isError: moviesIsError,
  } = useQuery({
    queryKey: ["company-movies", { id }],
    queryFn: getCompanyMovies,
  });

  if (isPending || moviesPending) return <Spinner />;
  if (isError) return <Typography variant="h5">{error.message}</Typography>;
  if (moviesIsError) return <Typography variant="h5">{moviesError.message}</Typography>;

  const movies = companyMovies?.results || [];

  const years = movies
    .map((m) => (m.release_date ? Number(m.release_date.slice(0, 4)) : null))
    .filter((y) => Number.isFinite(y));
  const minYear = years.length ? Math.min(...years) : null;
  const maxYear = years.length ? Math.max(...years) : null;
  const avgRating = movies.length
    ? (movies.reduce((s, m) => s + (Number(m.vote_average) || 0), 0) / movies.length).toFixed(1)
    : "—";

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">
          {company.name}
        </Typography>
      </Grid>

      <Grid item xs={12} md={3}>
        {company.logo_path ? (
          <img
            alt={`${company.name} logo`}
            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body1">No logo available</Typography>
          </Paper>
        )}
      </Grid>

      <Grid item xs={12} md={9}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" component="p" sx={{ mb: 2 }}>
            Company Info
          </Typography>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {company.headquarters && <Chip label={`HQ: ${company.headquarters}`} />}
            {company.origin_country && <Chip label={`Country: ${company.origin_country}`} />}
            {company.parent_company?.name && <Chip label={`Parent: ${company.parent_company.name}`} />}
            {company.homepage && (
              <Button
                variant="outlined"
                size="small"
                href={company.homepage}
                target="_blank"
                rel="noreferrer"
              >
                Homepage
              </Button>
            )}
          </div>

          {company.description && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {company.description}
            </Typography>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" component="p" sx={{ mb: 2 }}>
            Quick stats
          </Typography>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Chip label={`Movies: ${movies.length}`} />
            <Chip label={`Average rating: ${avgRating}`} />
            <Chip label={`Year range: ${minYear ?? "—"}${minYear && maxYear ? " – " : ""}${maxYear ?? ""}`} />
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Produced Movies
        </Typography>
        <Grid container>
          <MovieList
            movies={movies}
            action={(movie) => (
              <>
                <AddToFavoritesIcon movie={movie} />
                <MustWatchToggleIcon movie={movie} />
              </>
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompanyDetailsPage;
