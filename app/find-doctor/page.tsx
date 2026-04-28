import Header from "@/components/layout/Header/Header";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import Waves from "@/components/ui/animations/Waves";
import SplitText from "@/components/ui/animations/SplitText";
import BlurText from "@/components/ui/animations/BlurText";
import FeedbackSection from "@/components/sections/FeedbackSection/FeedbackSection";
import DoctorsGrid from "@/components/sections/Doctors/DoctorsGrid";

export default function FindDoctor() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-blue-900">
            <Waves
              lineColor="rgba(255, 255, 255, 0.2)"
              backgroundColor="transparent"
              waveSpeedX={0.01}
              waveSpeedY={0.01}
              waveAmpX={50}
              waveAmpY={30}
              friction={0.9}
              tension={0.01}
              maxCursorMove={120}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <SplitText
              text="Find your perfect healthcare match"
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
              delay={50}
              animationFrom={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animationTo={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            />
            <BlurText
              text="Browse our specialists, filter by specialty, and book directly from their profile."
              className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed"
              delay={100}
            />
          </div>
        </section>

        {/* Doctors Grid with live search */}
        <section className="bg-slate-50 relative z-10 -mt-10 rounded-t-[3rem] pt-10">
          <DoctorsGrid />
        </section>

        <FeedbackSection />
      </main>
      <Footer />
    </div>
  );
}
