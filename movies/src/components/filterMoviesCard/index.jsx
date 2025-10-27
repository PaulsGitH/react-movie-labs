import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from "../../images/pexels-dziana-hasanbekava-5480827.jpg";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import { getGenres, getLanguages } from "../../api/tmdb-api";

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterMoviesCard(props) {
  const { data: genresData, error: gErr, isPending: gPend, isError: gIsErr } =
    useQuery({
      queryKey: ["genres"],
      queryFn: getGenres,
    });

  const { data: langsData, error: lErr, isPending: lPend, isError: lIsErr } =
    useQuery({
      queryKey: ["languages"],
      queryFn: getLanguages,
    });

  if (gPend || lPend) return <Spinner />;
  if (gIsErr) return <h1>{gErr.message}</h1>;
  if (lIsErr) return <h1>{lErr.message}</h1>;

  const genres = genresData.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const languages = [{ iso_639_1: "all", english_name: "All" }, ...langsData];

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => handleChange(e, "name", e.target.value);
  const handleGenreChange = (e) => handleChange(e, "genre", e.target.value);
  const handleYearChange = (e) => handleChange(e, "year", e.target.value);
  const handleRatingChange = (e) => handleChange(e, "rating", e.target.value);
  const handleLanguageChange = (e) =>
    handleChange(e, "language", e.target.value);
  const handleVotesChange = (e) => handleChange(e, "votes", e.target.value);

  return (
    <Card sx={{ backgroundColor: "rgb(204, 204, 0)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>

        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search by title"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ ...formControl }}
          id="filter-year"
          label="Release year"
          type="number"
          variant="filled"
          value={props.yearFilter}
          onChange={handleYearChange}
          inputProps={{ min: 1900, max: 2100, step: 1 }}
        />

        <TextField
          sx={{ ...formControl }}
          id="filter-rating"
          label="Minimum rating"
          type="number"
          variant="filled"
          value={props.ratingFilter}
          onChange={handleRatingChange}
          inputProps={{ min: 0, max: 10, step: 0.1 }}
        />

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="language-label">Original language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={props.languageFilter}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.iso_639_1} value={lang.iso_639_1}>
                {lang.english_name ||
                  lang.name ||
                  lang.iso_639_1.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ ...formControl }}
          id="filter-votes"
          label="Minimum vote count"
          type="number"
          variant="filled"
          value={props.voteCountFilter}
          onChange={handleVotesChange}
          inputProps={{ min: 0, step: 10 }}
        />

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="sortby-label">Sort by</InputLabel>
          <Select
            labelId="sortby-label"
            id="sortby-select"
            value={props.sortOption || "title-asc"}
            onChange={(e) => props.onUserInput("sort", e.target.value)}
          >
            <MenuItem value="title-asc">Title (A–Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z–A)</MenuItem>
            <MenuItem value="date-newest">Release Date (Newest)</MenuItem>
            <MenuItem value="date-oldest">Release Date (Oldest)</MenuItem>
            <MenuItem value="rating-high">Rating (Highest)</MenuItem>
            <MenuItem value="rating-low">Rating (Lowest)</MenuItem>
            <MenuItem value="popularity-high">Popularity (Most)</MenuItem>
            <MenuItem value="popularity-low">Popularity (Least)</MenuItem>
          </Select>
        </FormControl>
      </CardContent>

      <CardMedia sx={{ height: 300 }} image={img} title="Filter" />

      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
