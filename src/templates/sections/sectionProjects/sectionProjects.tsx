import { projects } from "./utils/projects";
import { BannerProjects } from "./Components/bannerProjects";
import { motion } from "framer-motion";

export function SectionProjects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="container grid gap-8">
        <h3 className="text-center text-3xl font-bold mb-12">Projetos Pessoais</h3>

        <motion.div
          className="mx-auto bg-yellow-500 text-white font-bold text-xl md:text-2xl rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          +20
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
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
