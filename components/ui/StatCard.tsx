interface StatCardProps {
    label: string;
    value: string | number;
    variant?: "blue" | "amber" | "green" | "red";
}

const variants = {
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-500",
};

export default function StatCard({ label, value, variant = "blue" }: StatCardProps) {
    return (
        <div className={`rounded-2xl p-6 ${variants[variant]}`}>
            <p className="text-sm font-semibold uppercase tracking-wider opacity-70">{label}</p>
            <p className="text-4xl font-bold mt-1">{value}</p>
        </div>
    );
}
