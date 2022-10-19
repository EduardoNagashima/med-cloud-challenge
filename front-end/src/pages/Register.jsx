import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";
export default function Register(){
    return (
        <Container>
            <Navbar select={'Adicionar'}/>
            <div>
                <form action="">
                <Button variant="contained">
                Registrar
                </Button>
                </form>
            </div>
        </Container>
    );
}