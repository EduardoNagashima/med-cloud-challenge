import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RefreshContext from "../contexts/RefreshContext";
import api from "../services/api";
import * as React from "react";

const deletePatient = (id, count, setCount, selected, setSelected) => {
  api
    .delete(`/patients/${id}`)
    .then((res) => {
      res.data.status === "204" && alert("excluido com sucesso!");
      setCount(count + 1);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
};

export default function DeleteButton({ id }) {
  const { count, setCount } = React.useContext(RefreshContext);

  return (
    <Tooltip title="Delete" onClick={() => deletePatient(id, count, setCount)}>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
