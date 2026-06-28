import type { ProjectCategory } from "./projects";

const CATEGORY_ACCENT: Record<ProjectCategory, string> = {
  "Full Stack": "#FFC857",
  "Front-end": "#4FA9E8",
  "Back-end": "#46C98A",
  "Automações": "#B07CE8",
};

export function deriveAccent(category: ProjectCategory): string {
  return CATEGORY_ACCENT[category];
}
