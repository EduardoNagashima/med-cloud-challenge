import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";

import DeleteButton from "./DeleteButton";
import { Fragment } from "react";
import styled from "styled-components";

export default function PatientList({ patients, setSelected }) {
  return (
    <PatientBox
      sx={{ borderRadius: "5px", width: "100%", bgcolor: "background.paper" }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          {patients.map((patient, index) => {
            return (
              <Fragment key={patient.name + index}>
                <ListItem disablePadding onClick={() => setSelected(patient)}>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={patient.name} />
                    <DeleteButton id={patient.id} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Fragment>
            );
          })}
        </List>
      </nav>
    </PatientBox>
  );
}

const PatientBox = styled(Box)`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  align-self: flex-start;
`;
