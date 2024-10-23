import { Search } from "@/components/search";
import { Header } from "../components/header";
import Pets from "@/components/pets";

export default function Home() {
  return (
    <div className="bg-gradient-dark-blue min-h-screen">
      <Search />
      <Pets />
    </div>
  );
}
