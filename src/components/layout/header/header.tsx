import { Logo } from "../../logo/logo";
import { NavHeader } from "./nav/navheader";
import { MenuHeader } from "./menu/menu";
import { useToggle } from "@/hooks/usettogle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";

export function Header() {
  const Modal = useToggle();

  return (
    <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/[0.06] shadow-[0_1px_24px_rgba(0,0,0,0.4)]">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          <NavHeader className="flex gap-8" />
          <LanguageSwitcher />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <LanguageSwitcher />
          <MenuHeader open={Modal.isOpen} openchange={Modal.toggle} />
        </div>
      </div>
    </header>
  );
}
