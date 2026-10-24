import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/layout";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/instance";

type NextI18NextPageProps = {
  _nextI18Next?: {
    initialI18nStore: Record<string, Record<string, object>>;
    initialLocale: string;
    ns: string[];
  };
};

function App({ Component, pageProps }: AppProps) {
  const { _nextI18Next } = pageProps as NextI18NextPageProps;

  if (_nextI18Next) {
    const { initialI18nStore, initialLocale } = _nextI18Next;
    Object.entries(initialI18nStore).forEach(([lng, namespaces]) => {
      Object.entries(namespaces).forEach(([ns, resources]) => {
        if (!i18n.hasResourceBundle(lng, ns)) {
          i18n.addResourceBundle(lng, ns, resources, true, true);
        }
      });
    });
    if (i18n.language !== initialLocale) {
      i18n.changeLanguage(initialLocale);
    }
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </I18nextProvider>
  );
}

export default App;
