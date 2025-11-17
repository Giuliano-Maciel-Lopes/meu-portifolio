import { MediaContentAbout } from "./components/MediaContentAbout";
import { TextContentAbout } from "./components/TextAbout";

export function SectionAbout() {
  return (
    <section className="">
      <div className=" container flex flex-col ">

        <h3 className="text-center">About</h3>

        <div className="flex items-center ">
          <TextContentAbout />
          <MediaContentAbout />
          
        </div>
      </div>
    </section>
  );
}
