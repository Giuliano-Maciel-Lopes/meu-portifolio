import { ArrowButton } from "@/components/arrow/arrow";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInFromRight } from "@/styles/animaçoes/animaçoes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function RigthContet() {
  const { t } = useTranslation("hero");
  const roles = t("roles", { returnObjects: true }) as string[];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <motion.div
      className="md:w-1/2 w-full hidden md:flex flex-col justify-between gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      variants={fadeInFromRight}
    >
      <div className="flex flex-col gap-5 w-full text-left">
        <div className="h-9 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-2xl font-bold text-amber tracking-tight"
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="text-gray-300 text-base leading-relaxed">
          {t("description")}
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
          {t("cta_contact")}
        </Button>

        <a href="/giulianoo.pdf" download>
          <Button variant="fancy" className="text-lg">
            {t("cta_cv")}
          </Button>
        </a>
      </div>

      <div className="w-full flex justify-center">
        <ArrowButton text={t("about_link") as string} href="#about" />
      </div>
    </motion.div>
  );
}
