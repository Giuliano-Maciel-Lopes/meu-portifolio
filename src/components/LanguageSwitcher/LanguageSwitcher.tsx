import { useRouter } from "next/router";
import { useState } from "react";
import BR from "country-flag-icons/react/3x2/BR";
import US from "country-flag-icons/react/3x2/US";
import ES from "country-flag-icons/react/3x2/ES";
import PT from "country-flag-icons/react/3x2/PT";

const LOCALES = [
  { code: "pt-BR", label: "PT-BR", Flag: BR },
  { code: "en",    label: "EN",    Flag: US },
  { code: "es",    label: "ES",    Flag: ES },
  { code: "pt-PT", label: "PT-PT", Flag: PT },
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
        <current.Flag className="w-4 h-auto rounded-[2px]" />
        {current.label}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-20 bg-[#111] border border-white/10 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden min-w-[100px]">
            {LOCALES.map(({ code, label, Flag }) => (
              <button
                key={code}
                onClick={() => handleChange(code)}
                className={`
                  flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs font-semibold transition-colors duration-150
                  ${code === router.locale
                    ? "text-amber bg-amber/10"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <Flag className="w-4 h-auto rounded-[2px] shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
