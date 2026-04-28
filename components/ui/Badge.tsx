import { ReactNode } from "react";

type BadgeVariant = "pending" | "confirmed" | "cancelled" | "featured" | "blue" | "gray";

interface BadgeProps {
    variant?: BadgeVariant;
    children: ReactNode;
    icon?: ReactNode;
    className?: string;
}

const variants: Record<BadgeVariant, string> = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-500",
    featured: "bg-blue-50 text-blue-600",
    blue: "bg-blue-600 text-white",
    gray: "bg-gray-100 text-gray-600",
};

export default function Badge({ variant = "gray", children, icon, className = "" }: BadgeProps) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${variants[variant]} ${className}`}>
            {icon && <span className="w-3.5 h-3.5">{icon}</span>}
            {children}
        </span>
    );
}
