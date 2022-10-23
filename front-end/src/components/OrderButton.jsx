import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const OrderButton = () => {
  return (
    <ButtonGroup
      variant="contained"
      fullWidth
      aria-label="outlined primary button group"
    >
      <Button>Nome</Button>
      <Button>E-mail</Button>
      <Button>Data de Criação</Button>
    </ButtonGroup>
  );
};

export default OrderButton;
