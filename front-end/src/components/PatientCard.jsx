import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "@emotion/styled";
import EditForm from "./EditForm";

export default function PatientCard({ patient }) {
  return (
    <CardBox sx={{ width: 400, height: 600 }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", width: "100%" }}
      >
        <EditForm patient={patient} />
      </CardContent>
    </CardBox>
  );
}

const CardBox = styled(Card)``;
