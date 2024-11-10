import Footer from "@/components/footer";
import PetsSearch from "@/components/pets";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <PetsSearch />
      </main>
      <Footer />
    </div>
  );
}
