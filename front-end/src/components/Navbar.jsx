import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export default function Navbar({ select }) {
  return (
    <NavbarDiv>
      <LinkTo select={select === "Home"} to="/">
        <div>
          <p>Home</p>
        </div>
      </LinkTo>
      <LinkTo select={select === "Pacientes"} to="/pacientes/">
        <div>
          <p>Pacientes</p>
        </div>
      </LinkTo>
      <LinkTo select={select === "Adicionar"} to="/pacientes/adicionar">
        <div>
          <p>Adicionar</p>
        </div>
      </LinkTo>
      <LinkTo select={select === "Sobre"} to="/sobre">
        <div>
          <p>Sobre</p>
        </div>
      </LinkTo>
    </NavbarDiv>
  );
}

const NavbarDiv = styled("div")`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 1000px;
  margin-top: -70px;
  gap: 1px;
  border-bottom: 10px solid #08316a;
`;

const LinkTo = styled(Link)`
  text-decoration: none;
  width: 100%;
  height: ${(props) => (props.select ? "60px" : "50px")};
  display: flex;
  border-radius: 0px 50px 0 0;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.select ? "#08316A" : "#154E9C")};
  font-size: 20px;
  padding: 2px;
  font-size: ${(props) => (props.select ? "24px" : "20px")};
  p {
    color: #fff;
    font-weight: 700;
  }
`;
