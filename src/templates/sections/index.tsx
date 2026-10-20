import { SectionAbout } from "./sectionAbout/sectionAbout";
import { SectionHero } from "./sectionhero/sectionHero";
import { SectionSkills } from "./sectionSkills/SectionSkills";
import { SectionProjects } from "./sectionProjects/sectionProjects";
import { SectionContact } from "./sectionContact/sectionContact";
import { SectionExperience } from "./sectionExperience/sectionExprerience";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export function Sections() {
  return (
    <div className="flex flex-col gap-28">
        <SectionHero/>
        <SectionSkills/>
        <SectionProjects/>
        <SectionExperience/>
        <SectionAbout/>
        <SectionContact/>
        <WhatsAppButton/>
    </div>
  );
}