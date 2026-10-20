import { Header } from "./header/header";
import { SpaceBackground } from "@/components/space/SpaceBackground";
import { ScrollProgress } from "@/components/space/ScrollProgress";

type Props = {
  children?: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <SpaceBackground />
      <ScrollProgress />
      <Header />

      <main className="relative z-10 flex-1 flex flex-col items-center pt-20 md:pt-24">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
