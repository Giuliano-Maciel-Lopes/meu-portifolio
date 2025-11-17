import { useState } from "react";
import { categorys, skills } from "./utils/skills";
import { Button } from "@/components/ui/button";
import { BoxSkills} from "./components/boxSkills";

export function SectionSkills() {
  const [categorySelected, setCategorySelected] = useState<string | null>(null);

 
  const filtroteste = skills.filter(
    (skill) => skill.category === (categorySelected)
  );

 
  const teste = filtroteste.map((t) => <t.img key={t.name} size={36} color={t.color} />);

  return (
    <section className="flex bg-background py-20">
      <div className="container flex flex-col items-center">
        <h3 className="text-center">Skills</h3>

    
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {categorys.map((category, index) => (
            <Button
              key={index}
              variant="secondary"
              onClick={() => setCategorySelected(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <BoxSkills  items={teste} />

            
     
          
      
      </div>
    </section>
  );
}
