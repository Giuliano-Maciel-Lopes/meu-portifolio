import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SectionContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section id="contact" className="flex flex-col mb-16 scroll-mt-24">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col justify-center gap-2 text-center max-w-xl mx-auto">
          <h3 className="text-3xl font-bold text-gold-500">Contato</h3>
          <h5 className="text-lg font-semibold text-gray-200">
            Envie um email para trabalharmos juntos
          </h5>
          <p className="text-gray-400">
            Sinto que um novo projeto vem por aí! Envie um email para trabalharmos juntos.
          </p>
        </div>

       
        <form
          action="https://formsubmit.co/giulianomaciellopess@gmail.com"
          method="POST"
          className="flex flex-col gap-4 max-w-lg mx-auto mt-10"
        >
        

          <Input
            legend="Nome"
            type="text"
            name="name"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            legend="Email"
            type="email"
            name="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            legend="Assunto"
            type="text"
            name="subject"
            placeholder="Assunto"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-300">
              Mensagem
            </label>
            <textarea
              name="message"
              placeholder="Escreva sua mensagem aqui e deixe seu telefone, se quiser contato mais rápido."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className=" focus:border-yellow-300 flex h-36 w-full rounded-md border-2 border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>

          <Button
            className="max-w-xs mx-auto flex justify-center"
            variant="fancy"
            type="submit"
          >
            Enviar
          </Button>
        </form>
      </div>
    </section>
  );
}
