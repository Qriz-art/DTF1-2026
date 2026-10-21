import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WaliKelas from "@/components/WaliKelas";
import Keinginan from "@/components/Keinginan";
import Album from "@/components/Album";
import Guru from "@/components/Guru";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WaliKelas />
      <Keinginan />
      <Album />
      <Guru />
      <Footer />
    </>
  );
}
