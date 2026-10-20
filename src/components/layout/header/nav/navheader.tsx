import { Activelink } from "@/components/ActiveLink";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
};

export function NavHeader({ className }: Props) {
  const { t } = useTranslation("nav");

  const navItems = [
    { name: t("home"), href: "#home" },
    { name: t("skills"), href: "#skills" },
    { name: t("projects"), href: "#projects" },
    { name: t("experience"), href: "#experienci" },
    { name: t("about"), href: "#about" },
  ];

  return (
    <nav className={className}>
      {navItems.map((item) => (
        <div key={item.name}>
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
