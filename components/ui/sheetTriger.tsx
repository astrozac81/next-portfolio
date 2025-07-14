"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheetContent";

interface SheetTriggerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export function SheetTrigger({
  children,
  title,
  description,
  content,
  footer,
  side = "right",
  className,
  buttonProps,
}: SheetTriggerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
        className={cn("", className)}
        onClick={() => setOpen(true)}
        {...buttonProps}
      >
        {children}
      </Button>
      <SheetContent side={side}>
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {content && <div className="py-4">{content}</div>}
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}
