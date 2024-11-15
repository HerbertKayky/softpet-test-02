import Container from "@/components/container";
import Footer from "@/components/footer";
import PetsSearch from "@/components/pets";

export default function Home() {
  return (
    <>
      <Container>
        <PetsSearch />
      </Container>
      <Footer />
    </>
  );
}
