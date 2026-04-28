import { ReactNode, ElementType } from "react";

type Variant = "hero" | "section" | "card-title" | "body-lg" | "body" | "label" | "muted";

interface TypographyProps {
    variant?: Variant;
    as?: ElementType;
    children: ReactNode;
    className?: string;
}

const variantMap: Record<Variant, { tag: ElementType; cls: string }> = {
    "hero": { tag: "h1", cls: "text-hero" },
    "section": { tag: "h2", cls: "text-section" },
    "card-title": { tag: "h3", cls: "text-card-title" },
    "body-lg": { tag: "p", cls: "text-body-lg" },
    "body": { tag: "p", cls: "text-body" },
    "label": { tag: "p", cls: "text-label" },
    "muted": { tag: "p", cls: "text-muted" },
};

export default function Typography({ variant = "body", as, children, className = "" }: TypographyProps) {
    const { tag: DefaultTag, cls } = variantMap[variant];
    const Tag = as ?? DefaultTag;
    return <Tag className={`${cls} ${className}`}>{children}</Tag>;
}
