import Head from "next/head";
import { Sections } from "@/templates/sections";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <>
      <Head>
        <title>Giuliano Maciel | Desenvolvedor Full Stack</title>
        <meta
          name="description"
          content="Portfólio de Giuliano Maciel — Desenvolvedor Full Stack especializado em Next.js, Node.js, React, TypeScript e automações com IA. Projetos reais, APIs robustas e interfaces modernas."
        />
        <meta
          name="keywords"
          content="desenvolvedor full stack, portfólio dev, programador full stack, dev full stack brasil, desenvolvedor web, Giuliano Maciel, Next.js, Node.js, React, TypeScript, JavaScript, TailwindCSS, Redux, HTML5, CSS3, Framer Motion, React Query, React Hook Form, Express, Fastify, Docker, JWT, DDD, SOLID, TDD, Clean Code, PHP, PostgreSQL, MySQL, SQLite, Prisma, BigQuery, NoSQL, MongoDB, Git, GitHub, Figma, ESLint, Prettier, Vitest, n8n, OpenAI API, WhatsApp API, Chatwoot, WAHA, automação IA, IA atendente WhatsApp, Prompt Engineering, portfólio programador, desenvolvedor junior full stack"
        />
        <meta name="author" content="Giuliano Maciel Lopes" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://giulianomaciel.vercel.app" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://giulianomaciel.vercel.app" />
        <meta
          property="og:title"
          content="Giuliano Maciel | Desenvolvedor Full Stack"
        />
        <meta
          property="og:description"
          content="Portfólio de Giuliano Maciel — Desenvolvedor Full Stack especializado em Next.js, Node.js, React e automações com IA."
        />
        <meta property="og:image" content="https://giulianomaciel.vercel.app/og-image.png" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Giuliano Maciel | Dev Full Stack" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Giuliano Maciel | Desenvolvedor Full Stack"
        />
        <meta
          name="twitter:description"
          content="Portfólio de Giuliano Maciel — Desenvolvedor Full Stack especializado em Next.js, Node.js, React e automações com IA."
        />
        <meta name="twitter:image" content="https://giulianomaciel.vercel.app/og-image.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Giuliano Maciel Lopes",
              url: "https://giulianomaciel.vercel.app",
              jobTitle: "Desenvolvedor Full Stack",
              description:
                "Desenvolvedor Full Stack especializado em Next.js, Node.js, React, TypeScript e automações com IA.",
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
      ])),
    },
  };
};
