import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import PersonIcon from "@mui/icons-material/Person";

import DeleteButton from "./DeleteButton";
import { Fragment } from "react";
import styled from "styled-components";
import { textAlign } from "@mui/system";

export default function PatientList({ patients, setSelected }) {
  return (
    <PatientBox
      sx={{ borderRadius: "5px", width: "100%", bgcolor: "background.paper" }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          {patients.map((patient, index) => {
            const creationDate = dayjs(patient.creationDate).format(
              "DD/MM/YYYY - HH:mm"
            );
            const FormatedDate = creationDate;
            return (
              <Fragment key={patient.name + index}>
                <ListItem disablePadding onClick={() => setSelected(patient)}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={patient.name} />
                    <ListItemText primary={patient.email} />
                    <ListItemText
                      primary={FormatedDate}
                      secondary={"Em Dias"}
                    />
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