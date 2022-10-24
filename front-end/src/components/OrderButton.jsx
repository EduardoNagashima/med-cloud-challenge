import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import RefreshContext from "../contexts/RefreshContext";

const OrderButton = () => {
  const { count, setCount } = React.useContext(RefreshContext);

  function setLocalStorage(type) {
    localStorage.setItem("type", JSON.stringify(type));
    console.log(localStorage.getItem("type"));
    setCount(count + 1);
  }

  return (
    <ButtonGroup variant="contained" fullWidth>
      <Button onClick={() => setLocalStorage("name")}>Nome</Button>
      <Button onClick={() => setLocalStorage("email")}>E-mail</Button>
      <Button onClick={() => setLocalStorage("creationDate")}>
        Data de Criação
      </Button>
    </ButtonGroup>
  );
};

export default OrderButton;
