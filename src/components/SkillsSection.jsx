import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Data Analytics
  { name: "Excel", level: 85, category: "data-analytics" },
  { name: "SQL", level: 80, category: "data-analytics" },
  { name: "Power BI", level: 60, category: "data-analytics" },
  { name: "Python", level: 60, category: "data-analytics" },

  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Figma", level: 85, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
];

const categories = [
  "data-analytics",
  "frontend",
  "backend",
  "tools",
];

// Skill Card Component
const SkillCard = ({ skill }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += 1;

      if (start >= skill.level) {
        start = skill.level;
        clearInterval(interval);
      }

      setCount(start);
    }, 15);

    return () => clearInterval(interval);
  }, [skill.level]);

  return (
    <div className="bg-card p-6 rounded-lg shadow-xs card-hover">
      {/* Skill Name */}
      <div className="text-left mb-4">
        <h3 className="font-semibold text-lg">
          {skill.name}
        </h3>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-2 rounded-full"
          style={{
            width: `${count}%`,
            transition: "width 15ms linear",
          }}
        />
      </div>

      {/* Percentage */}
      <div className="text-right mt-1">
        <span className="text-sm text-muted-foreground">
          {count}%
        </span>
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] =
    useState("data-analytics");

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="py-24 px-4 relative bg-secondary/30"
    >
      <div className="container mx-auto max-w-5xl">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <SkillCard key={key} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};