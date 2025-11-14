import { SectionAbout } from "./sectionAbout/sectionAbout";
import { SectionHero } from "./sectionhero/sectionHero";

export function Sections() {
  return (
    <div className="flex flex-col gap-20 ">
        <SectionHero/>
        <SectionAbout/>
      
    </div>
  );
}