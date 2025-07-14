"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheetTriger";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheetContent";

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
  estimatedTime: number;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));
    const extractedHeadings = matches.map((match) => ({
      id: match[2].toLowerCase().replace(/\s+/g, "-"),
      text: match[2],
      level: match[1].length,
      estimatedTime: Math.ceil(match[2].length / 20), // Rough estimate: 20 chars per second
    }));
    setHeadings(extractedHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            // Expand the section when it becomes active
            const sectionId = entry.target.id.split("-")[0];
            setExpandedSections((prev) => 
              prev.includes(sectionId) ? prev : [...prev, sectionId]
            );
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [content]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => 
      prev.includes(id) 
        ? prev.filter(sectionId => sectionId !== id)
        : [...prev, id]
    );
  };

  const renderHeadings = (headings: Heading[]) => (
    <ul className="space-y-2">
      {headings.map((heading) => (
        <motion.li
          key={heading.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
        >
          <div className="flex items-center justify-between group">
            <a
              href={`#${heading.id}`}
              className={`block text-sm hover:text-primary transition-colors flex-1 ${
                activeId === heading.id ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {heading.text}
            </a>
            <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              {heading.estimatedTime} min
            </span>
          </div>
        </motion.li>
      ))}
    </ul>
  );

  if (headings.length === 0) return null;

  const totalReadingTime = headings.reduce((acc, h) => acc + h.estimatedTime, 0);

  return (
    <>
      {/* Desktop TOC */}
      <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Table of Contents</h2>
          <span className="text-sm text-muted-foreground">{totalReadingTime} min read</span>
        </div>
        {renderHeadings(headings)}
      </nav>

      {/* Mobile TOC */}
      <SheetTrigger
        title="Table of Contents"
        content={
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Table of Contents</h2>
              <span className="text-sm text-muted-foreground">{totalReadingTime} min read</span>
            </div>
            {renderHeadings(headings)}
          </>
        }
        side="right"
        className="lg:hidden fixed bottom-4 right-4 z-50"
      >
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <List className="w-4 h-4" />
          Contents
        </Button>
      </SheetTrigger>
    </>
  );
} 