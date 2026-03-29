import { FaExternalLinkAlt } from "react-icons/fa";

interface PropsCertificate {
  name: string;
  institution: string;
  link?: string;
  description: string;
  imageUrl?: string;
}

type Props = {
  certificate: PropsCertificate;
};

export function BoxCertificate({ certificate }: Props) {
  const handleClick = () => {
    if (certificate.link) {
      window.open(certificate.link, "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group relative flex flex-col rounded-2xl border border-white/10
        bg-[#0d0d0d]/80 backdrop-blur-sm
        shadow-[0_4px_24px_rgba(0,0,0,0.5)]
        hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(212,163,115,0.1)]
        transition-all duration-300 p-5 overflow-hidden
        ${certificate.link ? "cursor-pointer" : ""}
      `}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
        <div className="w-14 h-10 shrink-0 overflow-hidden rounded-lg border border-white/10">
          <img
            src={certificate.imageUrl || "/certificado.png"}
            alt={certificate.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-textPrimary tracking-tight leading-snug truncate">
            {certificate.name}
          </h4>
          <span className="text-[11px] uppercase tracking-widest text-white/30 font-semibold">
            {certificate.institution}
          </span>
        </div>
        {certificate.link && (
          <FaExternalLinkAlt className="w-3 h-3 text-white/20 group-hover:text-amber transition-colors shrink-0" />
        )}
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-0 flex-1">
        {certificate.description}
      </p>
    </div>
  );
}
