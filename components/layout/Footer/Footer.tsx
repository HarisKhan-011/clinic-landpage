import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  "Patient Care": ["Find a Doctor", "Appointments", "Patients & Visitors", "Health Library", "Institutes & Departments"],
  "About Us": ["100 Years of Cleveland Clinic", "About Us", "Locations", "Quality & Safety", "Diversity & Inclusion"],
  "Resources": ["Consult QD", "Health Essentials", "Newsroom", "MyChart", "Financial Assistance"],
  "Legal": ["Privacy Policy", "Terms of Use", "Site Map", "Website Feedback", "Accessibility"],
};

const socials = [
  { label: "in", href: "#" },
  { label: "tw", href: "#" },
  { label: "yt", href: "#" },
  { label: "ig", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white font-bold text-sm">C</div>
              <span className="font-bold text-xl text-white">Cleveland Clinic</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Committed to providing the highest standard of medical services and cutting-edge treatments for patients worldwide.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>800.223.2273</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>info@clevelandclinic.org</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>9500 Euclid Ave, Cleveland, OH</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {new Date().getFullYear()} Cleveland Clinic. All Rights Reserved.</p>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-blue-600 text-white rounded-full text-xs font-bold transition-colors uppercase"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
