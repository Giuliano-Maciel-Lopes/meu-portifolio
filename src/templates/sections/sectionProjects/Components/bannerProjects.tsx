import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaGithub, FaPlay } from "react-icons/fa";
import { useState } from "react";

type Project = {
  nameProject: string;
  img: string;
  description: string;
  stack: string[];
  linkdVideo?: string;
  linkdGitHub?: string;
  linkSite?: string;
};

type ProjectProps = {
  project: Project;
};

export function BannerProjects({ project }: ProjectProps) {
  const [isExpanded, setIsExpanded] = useState(false); 

  const handleClick = () => {
    if (project.linkSite) {
      window.open(project.linkSite, "_blank");
    }
  };

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsExpanded(!isExpanded);
  };

  const maxLength = 500;
  const shouldTruncate = project.description.length > maxLength;
  const displayedDescription = !isExpanded && shouldTruncate
    ? project.description.slice(0, maxLength) + "..."
    : project.description;

  return (
    <div
      onClick={handleClick}
        className={`
    w-full
    md:max-w-[420px]
    lg:max-w-[500px]
    xl:max-w-[550px]
    border border-gold/50 
    rounded-xl p-4 
    shadow-lg hover:shadow-2xl 
    hover:-translate-y-1 
    transition-all cursor-pointer 
    bg-black/30
    ${isExpanded ? "md:min-h-[750px]" : "md:min-h-[700px]"}
  `}
    >
      <div className="w-full h-[160px] overflow-hidden rounded-lg">
        <Image
          src={project.img}
          alt="Imagem do projeto"
          width={500}
          height={160}
          className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all"
        />
      </div>

      <h3 className="mt-3 text-lg font-semibold border-b border-gold/50 pb-1">
        {project.nameProject}
      </h3>

      <p className="text-gray-300 mt-2 text-sm leading-relaxed">
        {displayedDescription}
        {shouldTruncate && (
          <button
            onClick={toggleDescription}
            className="ml-1 text-yellow-400 underline text-xs"
          >
            {isExpanded ? "Ver menos" : "Ver mais"}
          </button>
        )}
      </p>

      <div className="flex gap-2 mt-4">
        {project.linkdGitHub && (
          <Button variant="outline" className="text-xs px-2 py-1" asChild>
            <a href={project.linkdGitHub} target="_blank">
              <FaGithub className="mr-1" /> GitHub
            </a>
          </Button>
        )}

        {project.linkdVideo && (
          <Button className="text-xs bg-blue-700 px-2 py-1" asChild>
            <a href={project.linkdVideo} target="_blank">
              <FaPlay className="mr-1" /> Vídeo
            </a>
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mt-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-sm border border-white/30 rounded-full px-2 py-0.5 text-gray-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
