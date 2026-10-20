import { useState } from "react";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { SectionTitle } from "@/components/sectionTitle/SectionTitle";

export function SectionContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation("contact");

  return (
    <section id="contact" className="scroll-mt-24 mb-16 md:pt-20">
      <div className="container">
        <div className="text-center space-y-2 mb-12">
          <SectionTitle
            index="05"
            title={t("title")}
            highlight={t("title_highlight")}
            subtitle={t("subtitle")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col gap-6 justify-center">
            <div>
              <p className="text-gray-400 text-sm leading-relaxed mb-0">
                {t("description")}
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
                    {t("form.name_label")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("form.name_placeholder") as string}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-gray-200 placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-widest text-white/40 font-semibold">
                    {t("form.email_label")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("form.email_placeholder") as string}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-gray-200 placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-widest text-white/40 font-semibold">
                  {t("form.subject_label")}
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder={t("form.subject_placeholder") as string}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-gray-200 placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-widest text-white/40 font-semibold">
                  {t("form.message_label")}
                </label>
                <textarea
                  name="message"
                  placeholder={t("form.message_placeholder") as string}
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
                {t("form.submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
