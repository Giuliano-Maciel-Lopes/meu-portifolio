import { BsArrowDown } from "react-icons/bs";
import { Button } from "../ui/button";

type Props = {
  text?: string;
  onClick?: () => void;
  href?: string; 
};

export function ArrowButton({ text = "Clique aqui", onClick, href }: Props) {
  const handleClick = () => {
    if (href) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      variant={"icon"}
      onClick={handleClick}
      className="flex items-center gap-1 text-yellow-500 font-medium hover:text-yellow-600 transition-colors"
    >
      <span>{text}</span>
      <span className="motion-safe:animate-nudge-down">
        <BsArrowDown size={20} />
      </span>
    </Button>
  );
}
