import styled from "@emotion/styled";
import { Link, Typography } from "@mui/material";
import RatingDisplay from "./RatingDisplay";

import Technologies from "./Technologies";

const HomeContent = () => {
  return (
    <HomeSection>
      <Typography
        sx={{
          fontFamily: "Cinzel",
          fontWeight: "400",
          fontSize: "42px",
          textAlign: "center",
          width: "1000px",
          margin: "0 auto",
        }}
        variant="h1"
      >
        Esse site foi desenvolvido para atender as especificações do processo
        seletivo da{" "}
        <Link underline="hover" href="https://medcloud.link/">
          Medcloud
        </Link>
        .
      </Typography>
      <TecText>Algumas das tecnologias usadas:</TecText>
      <div>
        <Technologies />
      </div>
      <RatingDisplay />
    </HomeSection>
  );
};

const HomeSection = styled("section")`
  @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@600&display=swap");
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TecText = styled("span")`
  font-size: 20px;
  font-weight: 500;
  align-self: center;
`;

export default HomeContent;
