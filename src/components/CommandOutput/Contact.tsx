import React from "react";
import { ExternalLink } from "lucide-react";

interface ContactProps {
  content: {
    formUrl: string;
  };
}

const Contact: React.FC<ContactProps> = ({ content }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-green-500/5 p-3 sm:p-4 rounded-lg border border-green-500/10">
        <h3 className="text-base sm:font-bold text-green-400 mb-3 sm:mb-4">
          Contact Form
        </h3>
        <a
          href={content.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-green-300 hover:text-green-400 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open Contact Form</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
