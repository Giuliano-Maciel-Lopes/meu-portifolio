import { ArrowButton } from "@/components/arrow/arrow";
import { motion } from "framer-motion";
import { fadeInFromRight } from "@/styles/animaçoes/animaçoes";

export function RigthContet() {
  return (
    <motion.div
      className="md:w-1/2 w-full hidden md:flex flex-col justify-between items-center gap-4"
 initial="hidden"
whileInView="visible"
viewport={{ once: false, amount: 0.5 }}
      variants={fadeInFromRight} 
    >
      <div className="flex flex-col gap-4 w-full text-left">
        <h3>Desenvolvedor full stack</h3>
        <span className="text-sm text-gray-700">-Resumo </span>

        <p className="text-gray-500">
          "Sou Full Stack Developer que vai além do código. Transformo soluções
          técnicas em experiências significativas, entregando valor tanto para a
          equipe quanto para o cliente final."
        </p>
      </div>
      <div >
        <ArrowButton text="Sobre mim" href="#sobre" />
      </div>
    </motion.div>
  );
}
