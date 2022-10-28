import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RefreshContext from "../contexts/RefreshContext";
import SelectedContext from "../contexts/SelectedContext";
import api from "../services/api";
import * as React from "react";
import { styled } from "@mui/material";
import Confirm from "./Confirm";

const deletePatient = (
  id,
  count,
  setCount,
  selected,
  setSelected,
  setAlert
) => {
  api
    .delete(`/patients/${id}`)
    .then((res) => {
      setAlert({
        msg: "Paciente excluido!",
        type: "success",
        show: true,
      });
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

export default function DeleteButton({ id, disabled, setAlert }) {
  const { count, setCount } = React.useContext(RefreshContext);
  const { selected, setSelected } = React.useContext(SelectedContext);
  const [open, setOpen] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);

  React.useEffect(() => {
    if (deleteConfirm) {
      deletePatient(id, count, setCount, selected, setSelected, setAlert);
      setDeleteConfirm(false);
    }
  }, [deleteConfirm]);

  return (
    <>
      <TooltipZ title="Delete">
        <CardActions>
          <IconButton
            onClick={() => setOpen(true)}
            disabled={disabled}
            aria-label="delete-button"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </TooltipZ>
      {open && (
        <Confirm
          setOpen={setOpen}
          open={open}
          name={selected.name}
          setDeleteConfirm={setDeleteConfirm}
        />
      )}
    </>
  );
}

const TooltipZ = styled(Tooltip)`
  z-index: 1;
`;
