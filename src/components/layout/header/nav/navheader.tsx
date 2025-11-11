import { nav } from "framer-motion/client";
import { Activelink } from "@/components/ActiveLink";

export function NavHeader() {
  const navItems = [
    { name: "Início", href: "#inicio" },
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Skills", href: "#skills" },
  ];

  return (
    <nav className="">
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Activelink.content key={item.name} href={item.href}>
            {item.name}
          </Activelink.content>
        ))}
      </div>
    </nav>
  );
}
