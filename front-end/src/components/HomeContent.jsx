import styled from "@emotion/styled";
import { Link, Rating, Typography } from "@mui/material";
import html5 from "../assets/html-5.png";
import css3 from "../assets/css-3.png";
import axios from "../assets/axios.png";
import prisma from "../assets/prisma.png";
import styledComponents from "../assets/styled-components.png";
import react from "../assets/react.png";
import typescript from "../assets/typescript.png";
import express from "../assets/express.png";
import node from "../assets/node.png";
import javascript from "../assets/javascript.png";
import joi from "../assets/joi.png";
import materialUI from "../assets/materialUI.png";

const HomeContent = () => {
  return (
    <HomeSection>
      <Typography
        sx={{ fontWeight: "400", fontSize: "42px", textAlign: "center" }}
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
        <TecDiv>
          <div>
            <div>
              <img src={html5} alt="html-5" />
              <h2>HTML 5</h2>
            </div>
            <div>
              <img src={css3} alt="html-5" />
              <h2>CSS</h2>
            </div>
            <div>
              <img src={javascript} alt="html-5" />
              <h2>Javascript</h2>
            </div>
            <div>
              <img src={react} alt="html-5" />
              <h2>React.js</h2>
            </div>
            <div>
              <img src={styledComponents} alt="html-5" />
              <h2>Styled-Components</h2>
            </div>
            <div>
              <img src={materialUI} alt="html-5" />
              <h2>Material UI</h2>
            </div>
          </div>
          <div>
            <div>
              <img src={axios} alt="html-5" />
              <h2>Axios</h2>
            </div>
            <div>
              <img src={node} alt="html-5" />
              <h2>Node.js</h2>
            </div>
            <div>
              <img src={express} alt="html-5" />
              <h2>Express</h2>
            </div>
            <div>
              <img src={typescript} alt="html-5" />
              <h2>Typescript</h2>
            </div>
            <div>
              <img src={joi} alt="html-5" />
              <h2>Joi</h2>
            </div>
            <div>
              <img src={prisma} alt="html-5" />
              <h2>Prisma</h2>
            </div>
          </div>
        </TecDiv>
      </div>
      <RatingDiv>
        <div>
          <Rating name="simple-controlled" value="4" readOnly />
          <Typography component="legend">
            "Muito útil para organização!" <p>Jonathan</p>
          </Typography>
        </div>
        <div>
          <Rating name="simple-controlled" value="5" readOnly />
          <Typography component="legend">
            "Todo hospital deveria usar!" <p>Joestar</p>
          </Typography>
        </div>
        <div>
          <Rating name="simple-controlled" value="5" readOnly />
          <Typography component="legend">
            "&#128077;" <p>Pai</p>
          </Typography>
        </div>
      </RatingDiv>
    </HomeSection>
  );
};

const TecDiv = styled("div")`
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img {
      width: 50%;
    }
    h2 {
      font-size: 20px;
    }
  }
`;

const RatingDiv = styled("div")`
  display: flex;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    text-align: center;
    p {
      margin-top: 0px;
      font-weight: 700;
    }
  }
`;

const HomeSection = styled("section")`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TecText = styled("span")`
  font-size: 22px;
  font-weight: 500;
  align-self: center;
`;

export default HomeContent;
