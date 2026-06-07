export function deriveAccent(stack: string[]): string {
  const s = stack.map((t) => t.toLowerCase());
  const isAI = s.some((t) =>
    ["n8n", "openai", "whatsapp", "chatwoot", "speech", "waha", "unichat", "meta"].some((k) => t.includes(k))
  );
  const hasNode = s.some(
    (t) => t.includes("node") || t.includes("express") || t.includes("fastify") || t.includes("nestjs")
  );
  const hasFront = s.some((t) => t.includes("react") || t.includes("next"));
  if (isAI) return "#B07CE8";
  if (hasNode && hasFront) return "#FFC857";
  if (hasFront) return "#4FA9E8";
  if (hasNode) return "#46C98A";
  return "#D4A373";
}

export function deriveCategoryLabel(stack: string[]): string {
  const s = stack.map((t) => t.toLowerCase());
  const isAI = s.some((t) =>
    ["n8n", "openai", "whatsapp", "chatwoot", "speech", "waha", "unichat", "meta"].some((k) => t.includes(k))
  );
  const hasNode = s.some(
    (t) => t.includes("node") || t.includes("express") || t.includes("fastify") || t.includes("nestjs")
  );
  const hasFront = s.some((t) => t.includes("react") || t.includes("next"));
  if (isAI) return "Automações";
  if (hasNode && hasFront) return "Full Stack";
  if (hasFront) return "Front-end";
  if (hasNode) return "Back-end";
  return "Full Stack";
}
