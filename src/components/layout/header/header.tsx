import { Logo } from "../../logo/logo";
import { NavHeader } from "./nav/navheader";
import { MenuHeader } from "./menu/menu";
import { useToggle } from "@/hooks/usettogle";

export function Header() {
  const Modal = useToggle();

  return (
    <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/[0.06] shadow-[0_1px_24px_rgba(0,0,0,0.4)]">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Logo />

        <div className="hidden md:flex gap-20">
          <NavHeader className="flex gap-8" />
        </div>

        <div className="flex md:hidden">
          <MenuHeader open={Modal.isOpen} openchange={Modal.toggle} />
        </div>
      </div>
    </header>
  );
}
