// Tools.jsx
import React from "react";
import "./Tools.css";

import {
  SiGit, SiGithub, SiPostman, SiDocker, SiNpm,
  SiVercel, SiFigma, SiNotion, SiSlack, SiMongodb,
  SiReact, SiNodedotjs, SiTailwindcss, SiFirebase, SiLinux,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const row1 = [
  { icon: <SiGit size={32} color="#F05032" />, name: "Git" },
  { icon: <SiGithub size={32} color="#333" />, name: "GitHub" },
  { icon: <VscVscode size={32} color="#007ACC" />, name: "VS Code" },
  { icon: <SiPostman size={32} color="#FF6C37" />, name: "Postman" },
  { icon: <SiDocker size={32} color="#0db7ed" />, name: "Docker" },
  { icon: <SiNpm size={32} color="#CB3837" />, name: "npm" },
  { icon: <SiVercel size={32} color="#000" />, name: "Vercel" },
  { icon: <SiFigma size={32} color="#F24E1E" />, name: "Figma" },
];

const row2 = [
  { icon: <SiSlack size={32} color="#4A154B" />, name: "Slack" },
  { icon: <SiNotion size={32} color="#000" />, name: "Notion" },
  { icon: <SiMongodb size={32} color="#4DB33D" />, name: "MongoDB" },
  { icon: <SiReact size={32} color="#61DAFB" />, name: "React" },
  { icon: <SiNodedotjs size={32} color="#339933" />, name: "Node.js" },
  { icon: <SiTailwindcss size={32} color="#06B6D4" />, name: "Tailwind" },
  { icon: <SiFirebase size={32} color="#FFCA28" />, name: "Firebase" },
  { icon: <SiLinux size={32} color="#FCC624" />, name: "Linux" },
];

const Tools = () => {
  return (
    <div className="tools-section">
      <div className="marquee-wrapper">

        {/* Row 1 — left to right */}
        <div className="marquee-track left">
          {[...row1, ...row1].map((tool, i) => (
            <div className="tool-card" key={`r1-${i}`}>
              {tool.icon}
              <span>{tool.name}</span>
            </div>
          ))}
        </div>

        {/* Row 2 — right to left */}
        <div className="marquee-track right">
          {[...row2, ...row2].map((tool, i) => (
            <div className="tool-card" key={`r2-${i}`}>
              {tool.icon}
              <span>{tool.name}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Tools;