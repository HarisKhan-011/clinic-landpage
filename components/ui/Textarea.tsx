import { TextareaHTMLAttributes, forwardRef, ReactNode } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    icon?: ReactNode;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, icon, error, className = "", ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                        {icon && <span className="text-blue-600">{icon}</span>}
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-900 bg-gray-50 focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-400 resize-none ${error ? "border-red-300" : ""} ${className}`}
                    {...props}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
export default Textarea;
