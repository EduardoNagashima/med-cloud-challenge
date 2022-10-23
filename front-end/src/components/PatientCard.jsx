import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import DeleteButton from "./DeleteButton";

export default function PatientCard({ patient }) {
  return (
    <CardBox sx={{ minWidth: 400, minHeight: 600 }}>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
          {patient.name}
        </Typography>
        <Typography variant="h5" component="div">
          {patient.email}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {patient.birthdate}
        </Typography>
        <Typography variant="body2">
          {patient.birthdate}
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions disableSpaFavoriteIconcing>
        <IconButton aria-label="add to favorites">
          <DeleteButton id={patient.id} />
        </IconButton>
      </CardActions>
    </CardBox>
  );
}

const CardBox = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
