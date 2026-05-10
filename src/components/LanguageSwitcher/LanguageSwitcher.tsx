import { useRouter } from "next/router";
import { useState } from "react";
import { TbWorld } from "react-icons/tb";

const LOCALES = [
  { code: "pt-BR", label: "PT-BR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "pt-PT", label: "PT-PT" },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = LOCALES.find((l) => l.code === router.locale) ?? LOCALES[0];

  const handleChange = (code: string) => {
    router.push(router.pathname, router.asPath, { locale: code, scroll: false });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-amber transition-colors duration-200 px-2.5 py-1.5 rounded-full border border-white/10 hover:border-amber/30"
      >
        <TbWorld className="w-3.5 h-3.5" />
        {current.label}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1.5 z-20 bg-[#111] border border-white/10 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden min-w-[80px]">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => handleChange(l.code)}
                className={`
                  block w-full text-left px-4 py-2 text-xs font-semibold transition-colors duration-150
                  ${l.code === router.locale
                    ? "text-amber bg-amber/10"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
