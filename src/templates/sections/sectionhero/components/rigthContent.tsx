import { ArrowButton } from "@/components/arrow/arrow";
import { motion } from "framer-motion";
import { fadeInFromRight } from "@/styles/animaçoes/animaçoes";
import { Button } from "@/components/ui/button";


export function RigthContet() {
  
  return (
    <motion.div
      className="md:w-1/2 w-full hidden md:flex flex-col justify-between  gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      variants={fadeInFromRight}
    >
      <div className="flex flex-col gap-4 w-full text-left">
        <h3>Desenvolvedor full stack</h3>
        <span className="text-sm text-gray-400">-Resumo </span>

        <p className="text-gray-100">
          Sou Full Stack Developer que vai além do código. Transformo soluções
          técnicas em experiências significativas, entregando valor tanto para a
          equipe quanto para o cliente final.
        </p>
      </div>

    <div className="flex gap-4">

  <Button
    onClick={() => {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }}
    variant="fancy"
    className="text-lg"
  >
    Entre em Contato
  </Button>

 
  <a href="/giuliano.pdf" download>
    <Button variant="fancy" className="text-lg">
      Baixar CV
    </Button>
  </a>
</div>
    <div className="w-full flex justify-center">
  <ArrowButton text="Sobre mim" href="#about" />
</div>
    </motion.div>
  );
}
