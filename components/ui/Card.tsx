import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: "sm" | "md" | "lg";
}

const paddings = { sm: "p-6", md: "p-8", lg: "p-10" };

export default function Card({ children, className = "", hover = false, padding = "md" }: CardProps) {
    return (
        <div
            className={`bg-white rounded-[2rem] border border-gray-100 shadow-sm ${paddings[padding]} ${hover ? "hover:shadow-xl transition-shadow duration-300" : ""} ${className}`}
        >
            {children}
        </div>
    );
}
