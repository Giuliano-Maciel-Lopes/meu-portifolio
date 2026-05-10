import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  lng: "pt-BR",
  fallbackLng: "pt-BR",
  defaultNS: "nav",
  interpolation: { escapeValue: false },
  initImmediate: false,
  resources: {},
});

export default i18n;
