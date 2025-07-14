"use client";

import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import { IconType } from "react-icons";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";

interface Skill {
  name: string;
  level: number;
  category: "Frontend" | "Backend" | "Blockchain" | "DevOps" | "Database" | "Tools";
  icon?: string;
  iconComponent?: IconType;
}

const skills: Skill[] = [
  // Frontend
  { name: "Next.js", level: 95, category: "Frontend", iconComponent: Icons.nextjs },
  { name: "Nuxt.js", level: 95, category: "Frontend", iconComponent: Icons.nuxtjs },
  { name: "React", level: 90, category: "Frontend", iconComponent: Icons.react },
  { name: "TypeScript", level: 85, category: "Frontend", iconComponent: Icons.typescript },

  // Backend
  { name: "Node.js", level: 88, category: "Backend", iconComponent: Icons.nodejs },
  { name: "Express.js", level: 85, category: "Backend", iconComponent: Icons.express },
  { name: "GraphQL", level: 82, category: "Backend", iconComponent: Icons.graphql },
  { name: "Python", level: 80, category: "Backend", iconComponent: Icons.python },
  { name: "Nest.js", level: 78, category: "Backend", iconComponent: Icons.django },

  // Blockchain
  { name: "Solidity", level: 82, category: "Blockchain", iconComponent: Icons.solidity },
  { name: "Ethereum", level: 80, category: "Blockchain", iconComponent: Icons.ethereum },
  { name: "Web3.js", level: 78, category: "Blockchain", iconComponent: Icons.web3dotjs },
  { name: "Truffle", level: 75, category: "Blockchain", iconComponent: Icons.truffle },
  { name: "Rust.js", level: 85, category: "Blockchain" },

  // Database
  { name: "PostgreSQL", level: 85, category: "Database", iconComponent: Icons.postgresql },
  { name: "MongoDB", level: 83, category: "Database", iconComponent: Icons.mongodb },
  { name: "Redis", level: 75, category: "Database", iconComponent: Icons.redis },

  // DevOps
  { name: "Docker", level: 80, category: "DevOps", iconComponent: Icons.docker },
  { name: "AWS", level: 75, category: "DevOps", iconComponent: Icons.aws },
  { name: "CI/CD", level: 82, category: "DevOps", iconComponent: Icons.ciCd },

  // Tools
  { name: "Git", level: 90, category: "Tools", iconComponent: Icons.git },
];

const categories = ["Frontend", "Backend", "Blockchain", "Database", "DevOps", "Tools"] as const;

type VisualizationType = "bars" | "radar" | "bubble";

type SortOption = "name" | "level" | "category";
type SortDirection = "asc" | "desc";

const SkillsChart = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number] | "All">("All");
  const [visualizationType, setVisualizationType] = useState<VisualizationType>("bars");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("level");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills = useMemo(() => {
    let result = skills;

    if (selectedCategory !== "All") {
      result = result.filter(skill => skill.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(skill =>
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query)
      );
    }

    result = [...result].sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1;
      switch (sortBy) {
        case "name":
          return direction * a.name.localeCompare(b.name);
        case "level":
          return direction * (a.level - b.level);
        case "category":
          return direction * a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy, sortDirection]);

  const chartData = useMemo(() => {
    return filteredSkills.map(skill => ({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      icon: skill.iconComponent,
    }));
  }, [filteredSkills]);

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortDirection("desc");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const renderSkillDetails = (skill: Skill) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setSelectedSkill(null)}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-card rounded-xl border p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-4">
          {skill.iconComponent && (
            <div className="p-3 rounded-lg bg-primary/10">
              <skill.iconComponent className="w-8 h-8" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold">{skill.name}</h3>
            <p className="text-muted-foreground">{skill.category}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Proficiency</span>
              <span className="text-sm text-primary">{skill.level}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                className="h-full bg-primary"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-5 h-5",
                  i < Math.ceil(skill.level / 20)
                    ? "text-primary fill-primary"
                    : "text-muted"
                )}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderVisualization = () => {

    return (
      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            data={chartData}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="name"
              tick={({ payload, x, y, textAnchor }) => (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor={textAnchor}
                    fill="hsl(var(--foreground))"
                    fontSize={12}
                  >
                    {payload.value}
                  </text>
                </g>
              )}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tickCount={6}
            />
            <Radar
              name="Level"
              dataKey="level"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary) / 0.2)"
              fillOpacity={0.6}
            />
            <RechartsTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card p-4 rounded-lg border shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {data.icon && <data.icon className="w-5 h-5" />}
                        <span className="font-medium">{data.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {data.category}
                      </div>
                      <div className="text-primary font-medium mt-1">
                        {data.level}%
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory("All")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            selectedCategory === "All"
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-muted hover:bg-muted/80"
          )}
        >
          All
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Visualization */}
      <AnimatePresence mode="wait">
        <motion.div
          key={visualizationType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl border p-6"
        >
          {renderVisualization()}
        </motion.div>
      </AnimatePresence>

      {/* Skill Details Modal */}
      <AnimatePresence>
        {selectedSkill && renderSkillDetails(selectedSkill)}
      </AnimatePresence>
    </motion.div>
  );
};

export default SkillsChart;
