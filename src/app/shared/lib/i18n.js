import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEn_US from "../locales/EN-US/translation.json";
import translatioFr_CA from "../locales/FR-CA/translation.json";

const languageSelected = localStorage.getItem("languageSelected") ? localStorage.getItem("languageSelected") : "en_us";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: languageSelected,
    fallbackLng: "en_us", // use en if detected lng is not available

    // keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    resources: {
      en_us: {
        translations: translationEn_US,
      },
      fr: {
        translations: translatioFr_CA,
      },
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
  });

export default i18n;
