import React from "react";

interface Project {
  name: string;
  period: string;
  role: string;
  teamSize: string;
  projectSize: string;
  startDate: string;
  duration: string;
  phase: string;
  description: string;
  responsibilities: string[];
  tech: {
    languages: string[];
    framework: string[];
    infrastructure: string[];
    tools: string[];
  };
  link?: string;
}

interface ProjectsProps {
  content: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ content }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {content.map((project) => (
        <div
          key={project.name}
          className="bg-gray-800/50 p-6 rounded-lg border border-green-400/20 hover:border-green-400/40 transition-all duration-300 group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg sm:text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
                {project.name}
              </h3>
              <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-300">
                {project.role}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <span className="text-sm">{project.period}</span>
              <span className="text-sm">・</span>
              <span className="text-sm">{project.teamSize}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm text-gray-300">
            <div>
              <div className="text-green-400 mb-1">開始時期</div>
              <div>{project.startDate}</div>
            </div>
            <div>
              <div className="text-green-400 mb-1">期間</div>
              <div>{project.duration}</div>
            </div>
            <div>
              <div className="text-green-400 mb-1">チーム規模</div>
              <div>{project.teamSize}</div>
            </div>
            <div>
              <div className="text-green-400 mb-1">担当工程</div>
              <div>{project.phase}</div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="space-y-4">
            <h4 className="font-semibold text-green-400 flex items-center space-x-2">
              <span>主な担当業務</span>
              <div className="h-px flex-1 bg-green-400/20"></div>
            </h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
              {project.responsibilities.map((resp, index) => (
                <li
                  key={index}
                  className="hover:text-gray-100 transition-colors"
                >
                  {resp}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 mt-6">
            <h4 className="font-semibold text-green-400 flex items-center space-x-2">
              <span>使用技術</span>
              <div className="h-px flex-1 bg-green-400/20"></div>
            </h4>
            <div className="space-y-2">
              {Object.entries(project.tech).map(
                ([category, items]) =>
                  items &&
                  items.length > 0 && (
                    <div key={category} className="flex flex-wrap gap-2">
                      <span className="text-xs text-green-400 font-semibold w-20">
                        {category}:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <span
                            key={item}
                            className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gray-700/50 text-green-300 border border-green-400/20"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <span>プロジェクトを見る</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
