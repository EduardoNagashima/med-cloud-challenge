import { Rating, Typography } from "@mui/material";
import styled from "styled-components";

const RatingDisplay = () => {
  return (
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
  );
};

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

export default RatingDisplay;
