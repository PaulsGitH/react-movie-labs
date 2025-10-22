import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PersonCredits from "../components/personCredits";
import Header from "../components/headerMovie"; // reuse header style for consistency

const headshot = (p) => p ? `https://image.tmdb.org/t/p/w300/${p}` : "";

const PersonDetailsPage = () => {
  const { id } = useParams();

  const { data: person, error: pErr, isPending: pLoad, isError: pBad } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });

  const { data: credits, error: cErr, isPending: cLoad, isError: cBad } = useQuery({
    queryKey: ["person-credits", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (pLoad || cLoad) return <Spinner />;
  if (pBad) return <h1>{pErr.message}</h1>;
  if (cBad) return <h1>{cErr.message}</h1>;

  const cast = credits.cast || [];

  return (
    <>
      <Paper
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: 1.5,
          margin: 0,
        }}
      >
        <Typography variant="h4" component="h3">
          {person.name}
          <br />
          <span sx={{ fontSize: "1.2rem" }}>{person.known_for_department}</span>
        </Typography>
      </Paper>

      <Grid container spacing={5} sx={{ p: "15px" }}>
        <Grid size={{ xs: 3 }}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Avatar
              alt={person.name}
              src={headshot(person.profile_path)}
              sx={{ width: 220, height: 220, mx: "auto", mb: 2 }}
            />
            <Typography variant="body1" component="p">Born: {person.birthday || "-"}</Typography>
            <Typography variant="body1" component="p">Place: {person.place_of_birth || "-"}</Typography>
            <Typography variant="body1" component="p">Also Known As:</Typography>
            <Typography variant="body2" component="p">
              {(person.also_known_as || []).join(", ") || "-"}
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h5" component="h3">Biography</Typography>
            <Typography variant="body1" component="p">
              {person.biography || "No biography available."}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" component="h3">Movie Credits</Typography>
            <PersonCredits cast={cast} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonDetailsPage;
