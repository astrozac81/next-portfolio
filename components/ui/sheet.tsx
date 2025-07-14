import * as React from "react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";

interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
    side?: "top" | "right" | "bottom" | "left";
    children: React.ReactNode;
}

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
    ({ children, className, open, onOpenChange, ...props }, ref) => {
        const [isOpen, setIsOpen] = React.useState(open);

        React.useEffect(() => {
            if (open !== undefined) {
                setIsOpen(open);
            }
        }, [open]);

        const handleOpenChange = (open: boolean) => {
            setIsOpen(open);
            if (onOpenChange) {
                onOpenChange(open);
            }
        };

        return (
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                {children}
            </Dialog>
        );
    }
);

Sheet.displayName = "Sheet";

export { Sheet };
