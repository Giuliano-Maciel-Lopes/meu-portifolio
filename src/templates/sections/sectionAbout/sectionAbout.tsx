import { MediaContentAbout } from "./components/MediaContentAbout";
import { TextContentAbout } from "./components/TextAbout";

export function SectionAbout() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="container flex flex-col">
        <h3 className="text-center">About</h3>

        <div className="flex items-center">
          <TextContentAbout />
          <MediaContentAbout />
        </div>
      </div>
    </section>
  );
}
