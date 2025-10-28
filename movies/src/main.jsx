import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from "@mui/material";
import SiteHeader from "./components/siteHeader";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import MoviesContextProvider from "./contexts/moviesContext";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import MovieRecommendationsPage from "./pages/movieRecommendationsPage";
import MovieSimilarPage from "./pages/movieSimilarPage";
import MovieCreditsPage from "./pages/movieCreditsPage";
import PersonDetailsPage from "./pages/personDetailsPage";
import CompanyDetailsPage from "./pages/companyDetailsPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import SearchMoviesPage from "./pages/searchMoviesPage";
import SearchActorsPage from "./pages/searchActorsPage";
import NotifyProvider from "./components/notifyProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7c3aed" },
    secondary: { main: "#22d3ee" },
    background: { default: "#0b1020", paper: "#121936" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ["Inter", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"].join(","),
    h4: { fontWeight: 700 },
  },
  components: {
    MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 12, textTransform: "none" } } },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{ a: { textDecoration: "none", color: "inherit" } }} />
        <BrowserRouter>
          <SiteHeader />
          <NotifyProvider>
            <MoviesContextProvider>
              <Routes>
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/popular" element={<PopularMoviesPage />} />
                <Route path="/movies/top_rated" element={<TopRatedMoviesPage />} />
                <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
                <Route path="/movies/:id/recommendations" element={<MovieRecommendationsPage />} />
                <Route path="/movies/:id/credits" element={<MovieCreditsPage />} />
                <Route path="/movies/:id/similar" element={<MovieSimilarPage />} />
                <Route path="/person/:id" element={<PersonDetailsPage />} />
                <Route path="/company/:id" element={<CompanyDetailsPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
                <Route path="/movies/search" element={<SearchMoviesPage />} />
                <Route path="/search/actors" element={<SearchActorsPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MoviesContextProvider>
          </NotifyProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
