import { SectionAbout } from "./sectionAbout/sectionAbout";
import { SectionHero } from "./sectionhero/sectionHero";
import { SectionSkills } from "./sectionSkills/SectionSkills";
import { SectionProjects } from "./sectionProjects/sectionProjects";
import { SectionContact } from "./sectionContact/sectionContact";

export function Sections() {
  return (
    <div className="flex flex-col gap-28 ">
        <SectionHero/>
        <SectionAbout/>
        <SectionSkills/>
        <SectionProjects/>
        <SectionContact/>
      
    </div>
  );
}