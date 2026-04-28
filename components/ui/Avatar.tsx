import { ReactNode } from "react";

interface AvatarProps {
    name?: string;
    icon?: ReactNode;
    size?: "sm" | "md" | "lg";
    color?: "blue" | "green" | "purple" | "amber";
}

const sizes = { sm: "w-10 h-10 text-sm rounded-xl", md: "w-14 h-14 text-base rounded-2xl", lg: "w-20 h-20 text-xl rounded-[1.5rem]" };
const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
};

export default function Avatar({ name, icon, size = "md", color = "blue" }: AvatarProps) {
    const initials = name
        ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
        : null;

    return (
        <div className={`flex items-center justify-center flex-shrink-0 font-bold ${sizes[size]} ${colors[color]}`}>
            {icon ?? initials ?? "?"}
        </div>
    );
}
