import * as React from "react";
import Switch from "@mui/material/Switch";
import { FormControlLabel, styled } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const SwitchDisabled = ({ edit, setEdit }) => {
  const handleChange = (event) => {
    setEdit(event.target.checked);
  };

  return (
    <SwitchDiv>
      <FormControlLabel
        control={
          <Switch
            checked={edit}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
      {edit ? (
        <LockIcon color="action" fontSize="medium" />
      ) : (
        <LockOpenIcon color="action" fontSize="medium" />
      )}
    </SwitchDiv>
  );
};

const SwitchDiv = styled("div")`
  padding: 10px;
  display: flex;
  width: 100%;
  align-items: center;
`;
export default SwitchDisabled;
