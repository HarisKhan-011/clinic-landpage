import Link from "next/link";

export default function SectionLandingPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Text */}
          <div className="space-y-6">
            <h1 className="text-[42px] lg:text-[52px] leading-[1.1] font-bold text-gray-900">
              We&apos;re here when you<br />
              need us for every care<br />
              <span className="text-blue-600">in the world</span>
            </h1>
            <p className="text-gray-600 text-[17px] max-w-md">
              Whenever you need support, we&apos;re here, ready to provide care for all your concerns.
              Our commitment extends to every aspect of your well-being.
            </p>
            <Link
              href="/appointments"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-9 py-4 rounded-2xl text-lg transition-colors"
            >
              Book Appointment
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80"
              alt="Medical team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Our Doctors</h3>
              <p className="text-gray-600 mb-8">Search by name, specialty, location and more.</p>
              <Link href="/find-doctor" className="text-blue-600 font-medium flex items-center gap-2 hover:underline">
                Find a doctor →
              </Link>
            </div>
            <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Locations</h3>
              <p className="text-gray-600 mb-8">Find any of our 300+ locations nearby.</p>
              <Link href="/institutes" className="text-blue-600 font-medium flex items-center gap-2 hover:underline">
                Explore →
              </Link>
            </div>
            <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Appointments</h3>
              <p className="text-gray-600 mb-8">Get the in-person or virtual care you need.</p>
              <Link href="/appointments" className="text-blue-600 font-medium flex items-center gap-2 hover:underline">
                Book Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
