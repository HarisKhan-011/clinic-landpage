"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useUser, useClerk } from "@clerk/nextjs";
import { Calendar, Menu, X } from "lucide-react";

const navLinks = [
    { href: "/find-doctor", label: "Find a Doctor" },
    { href: "/institutes", label: "Institutes & Departments" },
    { href: "/patients-visitors", label: "Patients & Visitors" },
    { href: "/health-library", label: "Health Library" },
    { href: "/appointments", label: "Appointments" },
];

export default function Navbar() {
    const { isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const isAdmin = user?.publicMetadata?.role === "admin";

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="flex items-center justify-between px-6 md:px-8 py-4">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-900 hover:scale-105 transition">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white font-bold">C</div>
                    <span>Cleveland Clinic</span>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex gap-8 text-gray-600 text-sm font-semibold italic items-center">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`transition-colors hover:text-blue-600 ${isActive(link.href) ? "text-blue-600 border-b-2 border-blue-600 pb-0.5" : ""}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    {isAdmin && (
                        <li>
                            <Link href="/admin" className={`transition-colors ${isActive("/admin") ? "text-purple-700 border-b-2 border-purple-600 pb-0.5" : "text-purple-600 hover:text-purple-700"}`}>
                                Admin
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Desktop Auth */}
                <div className="hidden lg:flex items-center gap-6">
                    {!isSignedIn ? (
                        <>
                            <SignInButton mode="modal">
                                <button suppressHydrationWarning className="text-blue-600 font-semibold hover:text-blue-700">Sign In</button>
                            </SignInButton>
                            <Link
                                href="/appointments"
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors"
                            >
                                <Calendar className="w-4 h-4" />
                                Make Appointment
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard" className="text-gray-600 font-semibold hover:text-blue-600 flex items-center gap-2 transition-colors">
                                <Calendar className="w-4 h-4" />
                                My Dashboard
                            </Link>
                            <UserButton />
                            <button onClick={() => signOut({ redirectUrl: "/" })} className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors">
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`py-3 px-4 rounded-xl font-semibold transition-colors ${isActive(link.href)
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isAdmin && (
                        <Link
                            href="/admin"
                            onClick={() => setOpen(false)}
                            className="py-3 px-4 rounded-xl text-purple-600 font-semibold hover:bg-purple-50 transition-colors"
                        >
                            Admin Panel
                        </Link>
                    )}

                    <div className="border-t border-gray-100 mt-3 pt-4 flex flex-col gap-3">
                        {!isSignedIn ? (
                            <>
                                <SignInButton mode="modal">
                                    <button suppressHydrationWarning className="w-full text-left py-3 px-4 rounded-xl text-blue-600 font-semibold hover:bg-blue-50 transition-colors">
                                        Sign In
                                    </button>
                                </SignInButton>
                                <Link
                                    href="/appointments"
                                    onClick={() => setOpen(false)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors"
                                >
                                    <Calendar className="w-4 h-4" />
                                    Make Appointment
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setOpen(false)}
                                    className="py-3 px-4 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                                >
                                    <Calendar className="w-4 h-4" />
                                    My Dashboard
                                </Link>
                                <div className="px-4">
                                    <UserButton />
                                </div>
                                <button
                                    onClick={() => { signOut({ redirectUrl: "/" }); setOpen(false); }}
                                    className="w-full text-left py-3 px-4 rounded-xl text-red-500 font-semibold hover:bg-red-50 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
