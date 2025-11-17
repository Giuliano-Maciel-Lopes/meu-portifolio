import { motion } from "framer-motion";
import { fadeInFromLeft } from "@/styles/animaçoes/animaçoes";
import { useAnimationEnabled } from "@/hooks/useAnimationDesktop";

export function TextContentAbout() {
  const { isAnimationEnabled } = useAnimationEnabled();

  return (
    <motion.div
      initial={isAnimationEnabled ? "hidden" : undefined}
      whileInView={isAnimationEnabled ? "visible" : undefined}
      viewport={isAnimationEnabled ? { once: false, amount: 0.5 } : undefined}
      variants={isAnimationEnabled ? fadeInFromLeft : undefined}
      className="md:w-1/2 mt-10"
    >
     <div className="flex flex-wrap gap-3">
  <h2 className="text-white">olá, sou</h2>
  <h2>Giuliano</h2>
</div>

      <p className="text-gray-400">
        Sou conhecido pela minha calma e paciência, que me ajudam a enfrentar
        desafios com foco e clareza. Nos últimos dois anos, mergulhei de cabeça
        no desenvolvimento web, estudando dia e noite com paixão e dedicação.
        Hoje sou Desenvolvedor Full Stack, trabalhando com JavaScript,
        TypeScript, React, Next.js, Node.js, aplicando SOLID, design patterns e
        boas práticas de UX/UI. Meu foco é entregar código limpo, mas não só
        para máquinas entenderem — afinal, programamos para pessoas, não para
        computadores. Busco soluções escaláveis, interfaces intuitivas e
        resultados que façam sentido para o usuário e para o negócio. Valorizo
        responsabilidade, senso de dono e atenção aos detalhes, sempre tentando
        transformar cada projeto em algo significativo. Para mim, desenvolver
        não é só trabalho — é paixão, alegria e dedicação, e acredito que os
        melhores produtos surgem quando técnica, criatividade e cuidado caminham
        juntos.
      </p>
    </motion.div>
  );
}
