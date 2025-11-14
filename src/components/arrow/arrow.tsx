import { BsArrowDown } from "react-icons/bs";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { link } from "fs";



type Props = {
  text?: string;
  onClick?: () => void;
  href?:string
};

export function ArrowButton({ text = "Clique aqui", onClick }: Props) {
  return (
    <Button
    variant={"icon"}
      onClick={onClick}
      className="flex  items-center gap-1 text-yellow-500 font-medium hover:text-yellow-600 transition-colors"
    >
      <span>{text}</span>
      <motion.div
        animate={{ y: [0, 5, 0] }} // sobe e desce
        transition={{ repeat: Infinity, duration: 0.6 }} // loop infinito
      >
        <BsArrowDown size={20} />
      </motion.div>
    </Button>
  );
}
