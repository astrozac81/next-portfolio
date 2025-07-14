"use client";

import React, { useState } from "react";
import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";

const ExperienceDescription: React.FC<{
  paragraphs: string[];
  bullets: string[];
}> = ({ paragraphs, bullets }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowExpand = paragraphs.length > 2;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {paragraphs.slice(0, isExpanded ? undefined : 2).map((paragraph, index) => (
          <p 
            key={index} 
            className={cn(
              "text-muted-foreground leading-relaxed",
              index === 0 && "text-foreground font-medium"
            )}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {shouldShowExpand && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <Icons.chevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Read More <Icons.chevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      )}

      <div className="pt-4 border-t">
        <h4 className="font-medium mb-3">Key Achievements</h4>
        <ul className="space-y-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start">
              <Icons.check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceDescription;