import React from "react";
import { Code2, Layout, Server, Wrench } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillsProps {
  content: {
    languages: Skill[];
    framework: Skill[];
    infrastructure: Skill[];
    tools: Skill[];
  };
}

interface RadarChartProps {
  skills: Skill[];
  title: string;
  accentColor: "indigo" | "pink" | "cyan" | "amber";
}

const RadarChart: React.FC<RadarChartProps> = ({
  skills,
  title,
  accentColor,
}) => {
  const displaySkills = skills.slice(0, 6);
  const sides = 6;
  const angleStep = (Math.PI * 2) / sides;
  const center = 160;
  const radius = 80;
  const fontSize = window.innerWidth < 640 ? 10 : 12;

  const getCoordinates = (angle: number, value: number) => {
    const distance = (value / 100) * radius;
    return {
      x: center + distance * Math.cos(angle - Math.PI / 2),
      y: center + distance * Math.sin(angle - Math.PI / 2),
    };
  };

  const points = displaySkills
    .map((_, i) => {
      const { x, y } = getCoordinates(i * angleStep, displaySkills[i].level);
      return `${x},${y}`;
    })
    .join(" ");

  const gridPoints = Array.from({ length: 5 }, (_, i) => {
    const level = (i + 1) * 20;
    return Array.from({ length: sides }, (_, j) => {
      const { x, y } = getCoordinates(j * angleStep, level);
      return `${x},${y}`;
    }).join(" ");
  });

  const getColorValues = (color: string) => {
    const colors = {
      indigo: { rgb: "99, 102, 241", alpha: "0.2", stroke: "0.1" },
      pink: { rgb: "236, 72, 153", alpha: "0.2", stroke: "0.1" },
      cyan: { rgb: "34, 211, 238", alpha: "0.2", stroke: "0.1" },
      amber: { rgb: "245, 158, 11", alpha: "0.2", stroke: "0.1" },
    };
    return colors[color];
  };

  const colorValues = getColorValues(accentColor);

  return (
    <div className="space-y-2">
      <h4
        className={`text-center text-xs sm:text-sm font-medium text-${accentColor}-400`}
      >
        {title}
      </h4>
      <svg
        viewBox="0 0 320 320"
        className="w-full max-w-[320px] sm:max-w-[380px] h-auto"
      >
        {/* Background Grid */}
        {gridPoints.map((points, i) => (
          <polygon
            key={`grid-${i}`}
            points={points}
            fill="none"
            stroke={`rgba(${colorValues.rgb}, ${colorValues.stroke})`}
            strokeWidth="0.5"
          />
        ))}

        {/* Skill Level Area */}
        <polygon
          points={points}
          fill={`rgba(${colorValues.rgb}, ${colorValues.alpha})`}
          stroke={`rgb(${colorValues.rgb})`}
          strokeWidth="2"
          className="transition-all duration-500"
        />

        {/* Skill Labels */}
        {displaySkills.map((skill, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDistance = radius + 45;
          const x = center + labelDistance * Math.cos(angle);
          const y = center + labelDistance * Math.sin(angle);

          const anchor =
            x > center + 10 ? "start" : x < center - 10 ? "end" : "middle";
          const baseline =
            y > center + 10 ? "hanging" : y < center - 10 ? "auto" : "middle";
          const dx = x > center + 10 ? "8" : x < center - 10 ? "-8" : "0";
          const dy = y > center + 10 ? "8" : y < center - 10 ? "-8" : "0";

          return (
            <g key={skill.name}>
              <text
                x={x}
                y={y}
                dx={dx}
                dy={dy}
                fontSize={fontSize}
                textAnchor={anchor}
                dominantBaseline={baseline}
                stroke="rgba(0, 0, 0, 0.5)"
                strokeWidth="4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                className="font-medium"
              >
                {skill.name}
              </text>
              <text
                x={x}
                y={y}
                dx={dx}
                dy={dy}
                fontSize={fontSize}
                textAnchor={anchor}
                dominantBaseline={baseline}
                fill="currentColor"
                className="font-medium"
              >
                {skill.name}
              </text>
            </g>
          );
        })}

        {/* Level Indicators */}
        {displaySkills.map((skill, i) => {
          const { x, y } = getCoordinates(i * angleStep, skill.level);
          return (
            <g key={`point-${skill.name}`}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="rgba(74, 222, 128, 0.2)"
                stroke="rgb(74, 222, 128)"
                strokeWidth="2"
                className="transition-all duration-500"
              />
              <text
                x={x}
                y={y}
                dx="0"
                dy="-8"
                fontSize={10}
                textAnchor="middle"
                fill="currentColor"
                className="font-bold"
              >
                {skill.level}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ content }) => {
  return (
    <div className="space-y-12 animate-fade-in select-text">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Languages */}
        <div className="space-y-4 bg-indigo-500/5 p-6 rounded-lg border border-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300">
          <div className="flex items-center space-x-2 text-indigo-400 mb-4">
            <Code2 className="w-5 h-5 flex-shrink-0" />
            <h3 className="font-bold">Languages</h3>
          </div>
          <div className="flex justify-center">
            <RadarChart
              skills={content.languages}
              title="Programming Languages"
              accentColor="indigo"
            />
          </div>
        </div>

        {/* Frontend */}
        <div className="space-y-4 bg-pink-500/5 p-6 rounded-lg border border-pink-500/20 hover:border-pink-500/30 transition-all duration-300">
          <div className="flex items-center space-x-2 text-pink-400 mb-4">
            <Layout className="w-5 h-5 flex-shrink-0" />
            <h3 className="font-bold">Framework</h3>
          </div>
          <div className="flex justify-center">
            <RadarChart
              skills={content.framework}
              title="Programming Frameworks"
              accentColor="pink"
            />
          </div>
        </div>

        {/* Backend */}
        <div className="space-y-4 bg-cyan-500/5 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300">
          <div className="flex items-center space-x-2 text-cyan-400 mb-4">
            <Server className="w-5 h-5 flex-shrink-0" />
            <h3 className="font-bold">Infrastructure</h3>
          </div>
          <div className="flex justify-center">
            <RadarChart
              skills={content.infrastructure}
              title="Infrastructure"
              accentColor="cyan"
            />
          </div>
        </div>

        {/* Tools */}
        <div className="space-y-4 bg-amber-500/5 p-6 rounded-lg border border-amber-500/20 hover:border-amber-500/30 transition-all duration-300">
          <div className="flex items-center space-x-2 text-amber-400 mb-4">
            <Wrench className="w-5 h-5 flex-shrink-0" />
            <h3 className="font-bold">Tools</h3>
          </div>
          <div className="flex justify-center">
            <RadarChart
              skills={content.tools}
              title="Development Tools"
              accentColor="amber"
            />
          </div>
        </div>
      </div>

      {/* スキルレベルの目安セクションを修正 */}
      <div className="space-y-3 text-sm sm:text-base">
        <h3 className="font-bold text-gray-300">スキルレベルの目安</h3>
        <div className="space-y-2 text-gray-400">
          <p className="text-xs sm:text-sm">
            レーダーチャートは5段階で技術レベルを表示しています：
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-1 gap-2 text-xs sm:text-sm ml-4">
            <li className="flex items-center space-x-2">
              <span className="font-medium text-green-400 w-12">100%</span>
              <span className="text-gray-400">
                エキスパートレベル - 深い理解に基づく他者への指導が可能
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-medium text-green-400 w-12">75%</span>
              <span className="text-gray-400">
                上級レベル - 実務で自立して開発が可能
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-medium text-green-400 w-12">50%</span>
              <span className="text-gray-400">
                中級レベル - 基本的な開発タスクをこなせる
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-medium text-green-400 w-12">25%</span>
              <span className="text-gray-400">
                初級レベル - 基礎的な知識を保有
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-medium text-green-400 w-12">0%</span>
              <span className="text-gray-400">未経験レベル - 学習開始段階</span>
            </li>
          </ul>
          <p className="text-xs sm:text-sm text-gray-500 italic mt-4">
            ※ 各スキルは実務経験と自己評価に基づいています
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
