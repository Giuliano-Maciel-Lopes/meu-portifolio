import { div, nav } from "framer-motion/client";
import { Activelink } from "@/components/ActiveLink";

type Props = {
  className?: string;
};

export function NavHeader({className}:Props) {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projetos", href: "#projects" },
    { name: "Experiências", href: "#experienci" },
  ];

  return (
    <nav className={className}>

      {navItems.map((item) => (
        <div key={item.name} >
          <Activelink.conatiner key={item.name} className="md:hidden">
            <Activelink.content key={item.name} href={item.href}>
              {item.name}
            </Activelink.content>
          </Activelink.conatiner>

          <div className="md:block hidden gap-20">
            <Activelink.content key={item.name} href={item.href}>
              {item.name}
            </Activelink.content>
          </div>

        </div>
      ))}
    </nav>
  );
}
