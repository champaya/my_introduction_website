import React from "react";
import {
  Terminal,
  User,
  Code2,
  Briefcase,
  Mail,
  Award,
  FileDown,
} from "lucide-react";
import About from "./components/CommandOutput/About";
import Skills from "./components/CommandOutput/Skills";
import Projects from "./components/CommandOutput/Projects";
import Contact from "./components/CommandOutput/Contact";
import Certifications from "./components/CommandOutput/Certifications";
import Download from "./components/CommandOutput/Download";
import { handleCommand } from "./commands";

interface GUIProps {
  onSwitchMode: () => void;
}

const GUI: React.FC<GUIProps> = ({ onSwitchMode }) => {
  // Get command responses for each section
  const aboutContent = handleCommand("about").content;
  const skillsContent = handleCommand("skills").content;
  const projectsContent = handleCommand("projects").content;
  const contactContent = handleCommand("contact").content;
  const certificationsContent = handleCommand("certifications").content;
  const downloadContent = handleCommand("download").content;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-sm border-b border-green-500/20 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6" />
              <span className="font-bold">Terminal Portfolio</span>
            </div>
            <button
              onClick={onSwitchMode}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors"
            >
              <Terminal className="w-4 h-4" />
              <span className="text-sm">Switch to CLI</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto space-y-24">
          {/* Hero Section */}
          <div className="text-center py-12 space-y-6">
            <Terminal className="w-16 h-16 mx-auto text-green-400 animate-pulse" />
            <h1 className="text-4xl font-bold">Terminal Portfolio</h1>
            <p className="text-green-400/80">
              Full Stack Developer & Software Engineer
            </p>
          </div>

          {/* About Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <User className="w-6 h-6" />
              About Me
            </h2>
            <About content={aboutContent} />
          </section>

          {/* Skills Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Code2 className="w-6 h-6" />
              Skills
            </h2>
            <Skills content={skillsContent} />
          </section>

          {/* Certifications Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Award className="w-6 h-6" />
              Certifications
            </h2>
            <Certifications content={certificationsContent} />
          </section>

          {/* Projects Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Briefcase className="w-6 h-6" />
              Projects
            </h2>
            <Projects content={projectsContent} />
          </section>

          {/* Download Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FileDown className="w-6 h-6" />
              Resume
            </h2>
            <Download content={downloadContent} />
          </section>

          {/* Contact Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Mail className="w-6 h-6" />
              Contact
            </h2>
            <Contact content={contactContent} />
          </section>

          {/* Tips Section */}
          <section className="space-y-6 pb-12">
            <p>
              Thank you for reading my portfolio. <br/>
              Please try typing the hidden command <code className="bg-green-500/20 px-2 py-1 rounded">game</code> in the CLI. 
              You can enjoy the invader game!
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900/90 backdrop-blur-sm border-t border-green-500/20">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Terminal Portfolio by{" "}
            <span className="text-green-400">HAYATO ITO</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GUI;
