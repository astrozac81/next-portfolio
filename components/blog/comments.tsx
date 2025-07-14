"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface CommentsProps {
  slug: string;
}

export function Comments({ slug }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "your-username/your-repo"); // Replace with your GitHub repo
    script.setAttribute("data-repo-id", "your-repo-id"); // Replace with your repo ID
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "your-category-id"); // Replace with your category ID
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = "";
      }
    };
  }, [resolvedTheme, slug]);

  return (
    <div className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <div ref={commentsRef} className="giscus" />
    </div>
  );
} 