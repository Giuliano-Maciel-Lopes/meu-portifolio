import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const WA_NUMBER = "5531986776676";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("whatsapp");

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t("wa_message") as string)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] w-64"
          >
            <p className="text-sm text-white font-semibold mb-1">{t("chat_title")}</p>
            <p className="text-xs text-white/50 mb-3 leading-relaxed">
              {t("chat_description")}
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold py-2 rounded-xl transition-colors duration-200"
            >
              <FaWhatsapp className="w-4 h-4" />
              {t("open_whatsapp")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-colors duration-200"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-40"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes className="w-5 h-5 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaWhatsapp className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
