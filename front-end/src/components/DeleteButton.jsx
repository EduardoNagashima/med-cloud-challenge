import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RefreshContext from "../contexts/RefreshContext";
import SelectedContext from "../contexts/SelectedContext";
import api from "../services/api";
import * as React from "react";
import { styled } from "@mui/material";

const deletePatient = (id, count, setCount, selected, setSelected) => {
  api
    .delete(`/patients/${id}`)
    .then((res) => {
      res.data.status === "204";
      alert("excluido com sucesso!");
      if (selected.id === id) {
        setSelected({ name: "" });
      }
      setCount(count + 1);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
};

export default function DeleteButton({ id, disabled }) {
  const { count, setCount } = React.useContext(RefreshContext);
  const { selected, setSelected } = React.useContext(SelectedContext);

  return (
    <TooltipZ title="Delete">
      <CardActions>
        <IconButton
          onClick={() =>
            deletePatient(id, count, setCount, selected, setSelected)
          }
          disabled={disabled}
          aria-label="delete-button"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </TooltipZ>
  );
}

const TooltipZ = styled(Tooltip)`
  z-index: 1;
`;
