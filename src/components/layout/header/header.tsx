import { Logo } from "../../logo/logo";
import { NavHeader } from "./nav/navheader";
import { MenuHeader } from "./menu/menu";
import { useToggle } from "@/components/hooks/usettogle";

export function Header() {
  const Modal = useToggle();

  return (
    <header className="fixed top-0 w-full z-50 bg-yellow-500 backdrop-blur-md shadow-md border-b border-yellow-700">
      <div className="container mx-auto flex justify-between items-center h-20 md:h-24 px-4">
        <Logo />

        {/* Menu desktop */}
        <div className="hidden md:flex">
          <NavHeader />
        </div>

        {/* Menu mobile */}
        <div className="flex md:hidden">
          <MenuHeader open={Modal.isOpen} openchange={Modal.toggle} />
        </div>
      </div>
    </header>
  );
}
