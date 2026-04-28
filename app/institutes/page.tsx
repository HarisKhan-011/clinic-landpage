import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import Navbar from "@/components/layout/Navbar/Navbar";
import InstitutesDirectory from "@/components/sections/Institutes/InstitutesDirectory";
import InstitutesHero from "@/components/sections/Institutes/InstitutesHero";
import InstitutesInfo from "@/components/sections/Institutes/InstitutesInfo";

export default function DirectionHome() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navbar />
      
      <main>
        {/* HERO SECTION - Edge to edge */}
        <InstitutesHero />

        {/* DIRECTORY SECTION - High contrast background */}
        <div className="bg-white">
          <InstitutesDirectory />
        </div>

        {/* MORE INFO SECTION - Subtle blue tint background */}
        <div className="bg-blue-50/10 border-t border-gray-50">
          <InstitutesInfo />
        </div>
      </main>

      <Footer />
    </div>
  );
}

