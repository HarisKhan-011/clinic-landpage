import ShinyText from "@/components/ui/animations/ShinyText";
import TextType from "@/components/ui/animations/TextType";
import Link from "next/link";

export default function PhysicianRatings() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="space-y-10">
          <div>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
              Trusted Excellence
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Physician ratings you can{" "}
              <span className="text-blue-600 block sm:inline">
                <TextType
                  text={["truly trust", "rely on", "verify"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  deletingSpeed={50}
                  showCursor={true}
                  cursorCharacter="_"
                />
              </span>
            </h2>
            <ShinyText
              className="mt-6 text-xl text-slate-600 leading-relaxed font-light"
              shinyColor="rgba(37, 99, 235, 0.8)"
            >
              Choosing the right doctor is one of the most important decisions
              you'll make. Our commitment to transparency ensures you have
              access to verified patient feedback and clinical performance
              data.
            </ShinyText>
          </div>

          <div className="pt-10 border-t border-slate-200">
            {/* Resident Care Card */}
            <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-24 h-24 flex-shrink-0 bg-blue-50 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80"
                  alt="Dr. Ryan Reynolds"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-lg">★</span>
                  ))}
                  <span className="text-slate-400 text-sm font-medium ml-2">4.9/5.0</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Dr. Ryan Reynolds</h3>
                <p className="text-slate-500 mt-2 text-base italic">
                  "The care and attention I received was beyond my expectations. Highly recommend for any specialized needs."
                </p>
                <p className="text-blue-600 font-semibold mt-3 text-sm">Patient of Resident Care</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-6 pt-4">
            <Link href="/find-doctor" className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl active:scale-95 group overflow-hidden relative">
              <ShinyText text="Discover More" className="group-hover:text-white" />
            </Link>
            <Link href="/appointments" className="text-slate-600 hover:text-blue-600 font-bold px-6 py-5 transition-all flex items-center gap-2">
              Book Appointment <span className="text-xl">→</span>
            </Link>
          </div>
        </div>

        {/* Right Image with Decorative Elements */}
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] -rotate-3 z-0"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl z-10 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80"
              alt="Cleveland Clinic Premium Interior"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-slate-100 flex items-center gap-4 animate-bounce-slow">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">
              ✓
            </div>
            <div>
              <p className="text-slate-900 font-bold whitespace-nowrap">Verified Excellence</p>
              <p className="text-slate-500 text-sm">98% Satisfaction</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
