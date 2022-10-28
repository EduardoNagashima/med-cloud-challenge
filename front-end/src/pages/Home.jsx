import Container from "../components/Container";
import HomeContent from "../components/HomeContent";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <Container>
      <Navbar select={"Home"} />
      <HomeContent />
    </Container>
  );
}
