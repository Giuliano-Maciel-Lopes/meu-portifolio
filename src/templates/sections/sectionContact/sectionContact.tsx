import { useState } from "react";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export function SectionContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section id="contact" className="scroll-mt-24 mb-16">
      <div className="container">
        <div className="text-center space-y-2 mb-12">
          <h3 className="text-3xl font-bold tracking-tight">
            Vamos{" "}
            <span className="bg-gradient-to-r from-amber to-gold bg-clip-text text-transparent">
              trabalhar juntos
            </span>
          </h3>
          <p className="text-textSecondary text-sm tracking-widest uppercase mb-0">
            Responderei o mais breve possível
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col gap-6 justify-center">
            <div>
              <p className="text-gray-400 text-sm leading-relaxed mb-0">
                Tem um projeto em mente ou quer conversar sobre uma oportunidade?
                Me manda uma mensagem — respondo rápido.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:giulianomaciellopess@gmail.com"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-amber transition-colors duration-200 group"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] group-hover:border-gold/30 transition-colors">
                  <FaEnvelope className="w-3.5 h-3.5" />
                </span>
                giulianomaciellopess@gmail.com
              </a>

              <a
                href="https://www.linkedin.com/in/giulianomaciel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-amber transition-colors duration-200 group"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] group-hover:border-gold/30 transition-colors">
                  <FaLinkedin className="w-3.5 h-3.5" />
                </span>
                linkedin.com/in/giulianomaciel
              </a>

              <a
                href="https://github.com/Giuliano-Maciel-Lopes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-amber transition-colors duration-200 group"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] group-hover:border-gold/30 transition-colors">
                  <FaGithub className="w-3.5 h-3.5" />
                </span>
                github.com/Giuliano-Maciel-Lopes
              </a>
            </div>
          </div>

          <div className="bg-[#0d0d0d]/80 border border-white/10 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            <form
              action="https://formsubmit.co/giulianomaciellopess@gmail.com"
              method="POST"
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-widest text-white/40 font-semibold">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-gray-200 placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-widest text-white/40 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-gray-200 placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-widest text-white/40 font-semibold">
                  Assunto
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Sobre o que você quer conversar?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-gray-200 placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-widest text-white/40 font-semibold">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  placeholder="Descreva seu projeto ou deixe seu telefone para um contato mais rápido."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="h-32 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-gray-200 placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full h-10 rounded-lg bg-gradient-to-r from-amber to-gold text-black text-sm font-bold tracking-wide hover:opacity-90 hover:scale-[1.01] transition-all duration-200"
              >
                Enviar mensagem →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
