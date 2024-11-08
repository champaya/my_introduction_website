import React from "react";
import { Award } from "lucide-react";

interface Certification {
  name: string;
  issuer: string;
  date: string;
  validUntil?: string;
}

interface CertificationsProps {
  content: Certification[];
}

const Certifications: React.FC<CertificationsProps> = ({ content }) => {
  return (
    <div className="space-y-6 animate-fade-in select-text">
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {content.map((cert) => (
          <div
            key={cert.name}
            className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-green-400/20"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-green-400">
                  {cert.name}
                </h3>
                <div className="text-sm sm:text-base text-gray-300">
                  {cert.issuer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
