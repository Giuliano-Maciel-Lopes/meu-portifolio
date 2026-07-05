type DurationLabels = {
  year: string;
  years: string;
  month: string;
  months: string;
  and: string;
};

const DURATION_LABELS: Record<string, DurationLabels> = {
  "pt-BR": { year: "ano", years: "anos", month: "mês", months: "meses", and: "e" },
  "pt-PT": { year: "ano", years: "anos", month: "mês", months: "meses", and: "e" },
  en: { year: "year", years: "years", month: "month", months: "months", and: "and" },
  es: { year: "año", years: "años", month: "mes", months: "meses", and: "y" },
};

export function getWorkingDuration(startDate: Date, language: string): string {
  const now = new Date();

  let months =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  if (now.getDate() < startDate.getDate()) {
    months -= 1;
  }

  months = Math.max(months, 1);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const labels = DURATION_LABELS[language] ?? DURATION_LABELS["pt-BR"];

  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? labels.year : labels.years}`);
  }
  if (remainingMonths > 0) {
    parts.push(`${remainingMonths} ${remainingMonths === 1 ? labels.month : labels.months}`);
  }

  return parts.join(` ${labels.and} `);
}
