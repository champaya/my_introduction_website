import React from "react";
import { User, MapPin, Heart, Github } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { SiZenn, SiSimplenote } from "react-icons/si";

interface AboutProps {
  content: {
    name: string;
    role: string;
    bio: string;
    location: string;
    interests: string[];
    social?: {
      instagram: string;
      github: string;
      zenn: string;
      note: string;
    };
  };
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <div className="space-y-6 animate-fade-in select-text">
      <div className="flex items-center space-x-3 bg-green-500/10 p-2 sm:p-3 rounded-lg">
        <User className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 flex-shrink-0" />
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-green-400">
            {content.name}
          </h3>
          <span className="text-xs sm:text-sm text-green-300/80">
            {content.role}
          </span>
        </div>
      </div>

      <p className="text-sm sm:text-base leading-relaxed border-l-2 border-green-500/30 pl-4 whitespace-pre-wrap">
        {content.bio}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center space-x-2 bg-green-500/5 px-3 py-2 rounded-md">
          <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
          <span className="text-sm text-green-300">{content.location}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-green-400 flex-shrink-0" />
          <div className="flex flex-wrap gap-2">
            {content.interests.map((interest) => (
              <span
                key={interest}
                className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SNSリンクセクション - 説明文を追加 */}
      {content.social && (
        <div className="flex flex-col space-y-4">
          <a
            href={content.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-green-500/5 p-4 rounded-lg hover:bg-green-500/10 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Github className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-300 group-hover:text-green-200 transition-colors">
                GitHub
              </span>
            </div>
            <p className="text-xs text-green-300/70 pl-8">
              個人開発プロジェクト
            </p>
          </a>

          <a
            href={content.social.zenn}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-green-500/5 p-4 rounded-lg hover:bg-green-500/10 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-2">
              <SiZenn className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-300 group-hover:text-green-200 transition-colors">
                Zenn
              </span>
            </div>
            <p className="text-xs text-green-300/70 pl-8">
              プログラミングに関する情報を発信
            </p>
          </a>

          <a
            href={content.social.note}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-green-500/5 p-4 rounded-lg hover:bg-green-500/10 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-2">
              <SiSimplenote className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-300 group-hover:text-green-200 transition-colors">
                note
              </span>
            </div>
            <p className="text-xs text-green-300/70 pl-8">
              アルゴリズムを通した表現方法について発信
            </p>
          </a>

          <a
            href={`https://instagram.com/${content.social.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-green-500/5 p-4 rounded-lg hover:bg-green-500/10 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-2">
              <FaInstagram className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-300 group-hover:text-green-200 transition-colors">
                Instagram
              </span>
            </div>
            <p className="text-xs text-green-300/70 pl-8">自身の作品置場</p>
          </a>
        </div>
      )}
    </div>
  );
};

export default About;
