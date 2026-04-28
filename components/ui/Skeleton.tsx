interface SkeletonProps {
    className?: string;
    count?: number;
}

export default function Skeleton({ className = "h-32", count = 1 }: SkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={`bg-gray-100 rounded-[2rem] animate-pulse ${className}`} />
            ))}
        </>
    );
}
