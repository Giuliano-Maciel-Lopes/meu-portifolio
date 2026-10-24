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
        {/* no celular os projetos vêm antes das skills; no desktop a ordem do código */}
        <div className="-order-2 md:order-none">
          <SectionHero/>
        </div>
        <SectionSkills/>
        <div className="-order-1 md:order-none">
          <SectionProjects/>
        </div>
        <SectionExperience/>
        <SectionAbout/>
        <SectionContact/>
        <WhatsAppButton/>
    </div>
  );
}