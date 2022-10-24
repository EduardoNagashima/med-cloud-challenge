import DeleteIcon from "@mui/icons-material/Delete";
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

export default function DeleteButton({ id }) {
  const { count, setCount } = React.useContext(RefreshContext);
  const { selected, setSelected } = React.useContext(SelectedContext);

  return (
    <TooltipZ
      title="Delete"
      onClick={() => deletePatient(id, count, setCount, selected, setSelected)}
    >
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </TooltipZ>
  );
}

const TooltipZ = styled(Tooltip)`
  z-index: 3;
`;
