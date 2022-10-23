import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function BasicButtonGroup() {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button>Nome</Button>
      <Button>Data de Criação</Button>
      <Button>Three</Button>
    </ButtonGroup>
  );
}
