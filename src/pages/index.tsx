import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Sections } from "@/templates/sections";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SITE_URL = "https://giulianomaciel.vercel.app";
const LOCALES = ["pt-BR", "en", "es", "pt-PT"] as const;
const DEFAULT_LOCALE = "pt-BR";

const OG_LOCALE: Record<(typeof LOCALES)[number], string> = {
  "pt-BR": "pt_BR",
  en: "en_US",
  es: "es_ES",
  "pt-PT": "pt_PT",
};

function localeUrl(locale: string) {
  return locale === DEFAULT_LOCALE ? `${SITE_URL}/` : `${SITE_URL}/${locale}`;
}

export default function Home() {
  const { t } = useTranslation("seo");
  const router = useRouter();
  const currentLocale = router.locale ?? DEFAULT_LOCALE;
  const canonicalUrl = localeUrl(currentLocale);

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
        <meta name="keywords" content={t("keywords")} />
        <meta name="author" content="Giuliano Maciel Lopes" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {LOCALES.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={localeUrl(locale)}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={localeUrl(DEFAULT_LOCALE)} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={t("ogTitle")} />
        <meta property="og:description" content={t("ogDescription")} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:alt" content="Giuliano Maciel — Desenvolvedor Full Stack" />
        <meta property="og:locale" content={OG_LOCALE[currentLocale as (typeof LOCALES)[number]] ?? OG_LOCALE["pt-BR"]} />
        {LOCALES.filter((locale) => locale !== currentLocale).map((locale) => (
          <meta key={locale} property="og:locale:alternate" content={OG_LOCALE[locale]} />
        ))}
        <meta property="og:site_name" content="Giuliano Maciel | Dev Full Stack" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("ogTitle")} />
        <meta name="twitter:description" content={t("ogDescription")} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Giuliano Maciel Lopes",
              url: SITE_URL,
              image: `${SITE_URL}/og-image.png`,
              jobTitle: "Desenvolvedor Full Stack",
              description: t("personDescription"),
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ipatinga",
                addressRegion: "MG",
                addressCountry: "BR",
              },
              sameAs: [
                "https://github.com/Giuliano-Maciel-Lopes",
                "https://www.linkedin.com/in/giulianomaciel",
              ],
              knowsAbout: [
                "JavaScript","TypeScript","PHP","SOLID","Clean Code","TDD","DDD",
                "React","Next.js","Redux","TailwindCSS","HTML5","CSS3","Framer Motion",
                "React Query","React Hook Form","Node.js","Express","Fastify","Docker",
                "JWT Auth","PostgreSQL","MySQL","SQLite","Prisma ORM","BigQuery","NoSQL",
                "MongoDB","Git","GitHub","Figma","n8n","OpenAI API","Prompt Engineering",
                "WhatsApp API","Chatwoot","WAHA","IA de Atendimento",
              ],
            }),
          }}
        />
      </Head>
      <div>
        <Sections />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt-BR", [
        "hero",
        "about",
        "skills",
        "experience",
        "projects",
        "contact",
        "whatsapp",
        "nav",
        "seo",
      ])),
    },
  };
};
