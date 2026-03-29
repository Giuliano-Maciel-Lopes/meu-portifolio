import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type experienceProps = {
  name: string;
  tempo: string;
  empresa: string;
  fotoUrl: string;
  subFotoUrl?: string;
  description: string;
};

type Props = {
  experience: experienceProps;
};

export function BoxExp({ experience }: Props) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(212,163,115,0.1)] transition-all duration-300 p-6">
      <div className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-gold/60 via-amber/30 to-transparent" />

      <div className="flex items-start justify-between gap-4 mb-5 pl-4">
        <div className="flex-1">
          <h4 className="text-base font-bold text-textPrimary tracking-tight leading-snug mb-1">
            {experience.name}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] uppercase tracking-widest text-white/30 font-semibold">
              {experience.empresa}
            </span>
            {experience.tempo && (
              <>
                <span className="text-white/15">·</span>
                <span className="text-[11px] text-amber/70 font-medium">
                  {experience.tempo}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Image
            alt={experience.empresa}
            src={experience.fotoUrl || "/placeholder.png"}
            width={44}
            height={44}
            className="rounded-full border border-white/10 object-cover"
          />
          {experience.subFotoUrl && (
            <Image
              alt={`${experience.empresa} sub`}
              src={experience.subFotoUrl}
              width={36}
              height={36}
              className="rounded-full border border-white/10 object-cover opacity-75"
            />
          )}
        </div>
      </div>

      <div className="pl-4 text-gray-400 text-sm leading-relaxed space-y-2">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            ul: ({ children }) => <ul className="space-y-1.5 mt-2">{children}</ul>,
            li: ({ children }) => (
              <li className="flex items-start gap-2 list-none">
                <span className="text-amber text-xs mt-0.5 shrink-0">▸</span>
                <span>{children}</span>
              </li>
            ),
          }}
        >
          {experience.description}
        </ReactMarkdown>
      </div>
    </div>
  );
}
