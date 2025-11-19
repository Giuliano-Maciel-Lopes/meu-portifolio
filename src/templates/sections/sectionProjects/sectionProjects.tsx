import { projects } from "./utils/projects";
import { BannerProjects } from "./Components/bannerProjects";
import { motion } from "framer-motion";
import { once } from "events";

export function SectionProjects() {
  return (
    <section id="projects scroll-mt-24">
      <div className="container">
        <h3 className="text-center"> Projetos Pessoais </h3>
        <div className="grid md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.3,
                ease: "easeOut",
              }}
              viewport={{ amount: 0.2 }}
            >
              <BannerProjects project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
