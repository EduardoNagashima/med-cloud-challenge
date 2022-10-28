import html5 from "../assets/html-5.webp";
import css3 from "../assets/css-3.webp";
import javascript from "../assets/javascript.png";
import react from "../assets/react.png";
import styledComponents from "../assets/styled-components.png";
import materialUI from "../assets/materialUI.webp";
import axios from "../assets/axios.png";
import node from "../assets/node.png";
import express from "../assets/express.png";
import typescript from "../assets/typescript.png";
import joi from "../assets/joi.webp";
import prisma from "../assets/prisma.png";
import aws from "../assets/aws.webp";
import styled from "styled-components";

const Technologies = () => {
  return (
    <>
      <TecDiv>
        <div>
          <div>
            <img src={html5} alt="html5" />
            <h2>HTML 5</h2>
          </div>
          <div>
            <img src={css3} alt="css3" />
            <h2>CSS</h2>
          </div>
          <div>
            <img src={javascript} alt="javascript" />
            <h2>Javascript</h2>
          </div>
          <div>
            <img src={react} alt="react" />
            <h2>React.js</h2>
          </div>
          <div>
            <img src={styledComponents} alt="styledComponents" />
            <h2>Styled-Components</h2>
          </div>
          <div>
            <img src={materialUI} alt="materialUI" />
            <h2>Material UI</h2>
          </div>
        </div>
        <div>
          <div>
            <img src={axios} alt="axios" />
            <h2>Axios</h2>
          </div>
          <div>
            <img src={node} alt="node" />
            <h2>Node.js</h2>
          </div>
          <div>
            <img src={express} alt="express" />
            <h2>Express</h2>
          </div>
          <div>
            <img src={typescript} alt="typescript" />
            <h2>Typescript</h2>
          </div>
          <div>
            <img src={joi} alt="joi" />
            <h2>Joi</h2>
          </div>
          <div>
            <img src={prisma} alt="prisma" />
            <h2>Prisma</h2>
          </div>
        </div>
      </TecDiv>
      <AwsDiv>
        <AwsImg src={aws} alt="aws" />
        <h2>AWS EC2 e RDS</h2>
      </AwsDiv>
    </>
  );
};

const TecDiv = styled("div")`
  width: 90%;
  margin: 0 auto;
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
      width: 40%;
    }
    h2 {
      font-size: 20px;
    }
  }
`;

const AwsDiv = styled("div")`
  margin: 0 auto;
  width: 15%;
  display: flex;
  margin-top: -20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AwsImg = styled("img")`
  width: 100%;
`;

export default Technologies;
