import Link from "next/link";
import { Phone } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#0f172a] text-gray-300 text-sm px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Phone */}
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium">800.223.2273</span>
        </div>

        {/* Right - Links */}
        <nav className="hidden md:flex items-center gap-6">
          {["MyChart", "Need Help", "Giving", "Careers"].map((item) => (
            <Link
              key={item}
              href="#"
              className="hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
