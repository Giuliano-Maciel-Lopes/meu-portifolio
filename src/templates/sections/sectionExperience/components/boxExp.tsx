import Image from "next/image";

type experienceProps = {
  name: string;
  tempo: string;
  empresa: string;
  fotoUrl: string;
  description: string;
};

type Props = {
  experience: experienceProps;
};

export function BoxExp({ experience }: Props) {
  const descriptionPoints = experience.description
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <div
      className=" min-h-[270px] rounded-lg p-4  
                shadow-md hover:shadow-lg bg-card transition-shadow duration-300 border border-gold"
    >
      <div className="flex items-center gap-4 mb-3 pb-2 border-b border-gold">
        <Image
          alt={experience.name}
          src={experience.fotoUrl || "/placeholder.png"}
          width={50}
          height={50}
          className="rounded-full border border-gray-300"
        />
        <div>
          <h4 className="text-lg font-semibold text-yellow-500 tracking-wide">
            {experience.name}
          </h4>
          <p className="text-sm text-gray-200">
            {experience.empresa && `Empresa: ${experience.empresa}`}{" "}
            {experience.tempo && `| Tempo: ${experience.tempo}`}
          </p>
        </div>
      </div>

      <ul className="list-disc list-inside text-gray-200 text-sm leading-relaxed tracking-wide space-y-1">
        {descriptionPoints.map((point, idx) => (
          <li key={idx}>{point.replace("-", "").trim()}</li>
        ))}
      </ul>
    </div>
  );
}
