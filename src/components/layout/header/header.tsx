import { Logo } from "../../logo/logo";
import { NavHeader } from "./nav/navheader";
import { MenuHeader } from "./menu/menu";
import { useToggle } from "@/hooks/usettogle";

export function Header() {
  const Modal = useToggle();

  return (
 
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-amber-400 via-amber-500 to-gold backdrop-blur-md shadow-lg border-b border-goldDark">
      <div className="container mx-auto flex justify-between items-center h-20 md:h-24 px-4">
        <Logo />

        {/* Menu desktop */}
        <div className="hidden md:flex gap-20">
          <NavHeader className="flex gap-4" />
        </div>

        {/* Menu mobile */}
        <div className="flex md:hidden">
          <MenuHeader open={Modal.isOpen} openchange={Modal.toggle} />
        </div>
        
      </div>
    </header>
  );
}
