import { Suspense } from "react";
import Header from "@/components/layout/Header/Header";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import HealthLibraryFullHero from "@/components/sections/HealthLibrary/HealthLibraryFullHero";
import HealthLibraryPromo from "@/components/sections/HealthLibrary/HealthLibraryPromo";
import ArticlesGrid from "@/components/sections/HealthLibrary/ArticlesGrid";
import FeedbackSection from "@/components/sections/FeedbackSection/FeedbackSection";

export default function HealthLibraryPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navbar />

      <main>
        <HealthLibraryFullHero />
        <HealthLibraryPromo />

        <section className="bg-gray-50/50">
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-gray-400">Loading articles...</div>}>
            <ArticlesGrid />
          </Suspense>
        </section>

        <FeedbackSection />
      </main>

      <Footer />
    </div>
  );
}
