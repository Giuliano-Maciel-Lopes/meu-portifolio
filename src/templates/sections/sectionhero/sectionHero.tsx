import { Button } from "@/components/ui/button";
import { networks } from "./utils/networking";

export function SectionHero() {
  return (
    <section className="mt-20 text-white">
      <div className="container flex md:flex-row flex-col justify-center items-center gap-8">
        
        {/* Lado esquerdo: texto e redes */}
        <div className="md:w-1/2 w-full flex flex-col items-start">
          <h1 >
            Giuliano Maciel
          </h1> 
          <Button >teste</Button>

          <div className="flex gap-4">
            {networks.map((network) => (
              <Button
             
                key={network.name}
                asChild
                className="bg-amber-500 rounded-full  flex items-center justify-center p-0 transition-all duration-300"
              >
             
                  <network.icone size={24} />

              </Button>
            ))}
          </div>
        </div>

        {/* Lado direito: espaço para imagem ou ilustração */}
        <div className="md:w-1/2 w-full flex justify-center items-center">
          {/* Coloque aqui sua imagem ou animação */}
        </div>
      </div>
    </section>
  );
}
