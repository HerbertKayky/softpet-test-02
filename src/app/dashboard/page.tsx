import Container from "@/components/container";
import { DashboardPets } from "./_components";
import Footer from "@/components/footer";

export default function UserPetsDashboard() {
  return (
    <>
      <Container>
        <DashboardPets />
      </Container>
      <Footer />
    </>
  );
}
