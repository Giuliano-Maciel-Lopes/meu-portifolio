
interface PropsCertificate {
  name: string;
  institution: string;
  link: string;
  description: string;
  imageUrl?: string;
}

type Props = {
  certificate: PropsCertificate;
};

export function BoxCertificate({ certificate }: Props) {
  return (
    <div
      className=" min-h-[200px] rounded-lg p-4 max-w-md mx-auto 
                     shadow-md hover:shadow-lg bg-card transition-shadow duration-300 border border-gold cursor-pointer"
      onClick={() => window.open(certificate.link, "_blank")}
    >
      <div className="flex gap-4 items-center mb-3 pb-2 border-b border-gold">
        <div className="flex-shrink-0 w-32 h-20 relative">
          <img
            src={certificate.imageUrl || "/certificado.png"}
            alt={certificate.name}
            className="w-full h-full object-cover rounded-lg border border-gray-300"
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-yellow-500 tracking-wide">
            {certificate.name}
          </h4>
          <span className="text-sm text-gray-200">
            {certificate.institution}
          </span>
        </div>
      </div>

      <p className="text-gray-200 text-sm leading-relaxed tracking-wide">
        {certificate.description}
      </p>
    </div>
  );
}
