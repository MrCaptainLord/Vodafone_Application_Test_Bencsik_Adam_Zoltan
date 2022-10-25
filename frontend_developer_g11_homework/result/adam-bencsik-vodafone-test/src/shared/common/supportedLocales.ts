import { enGB } from "date-fns/locale";

export type SupportedLanguanges = "en";

export type LocaleOptions = {
  longDateFormat: string;
  phoneFormat: string;
  phonePlaceholder: string;
  tinyMCEDates: string[];
  tinyMCELang: string;
  phonePattern: RegExp;
};
const supportedLocales: { [key: string]: Locale } = { en: enGB };

export const locales: {
  [key in SupportedLanguanges]: LocaleOptions;
} = {
  en: {
    longDateFormat: "dd-MMMM-yyyy",
    phoneFormat: "",
    phonePlaceholder: "",
    phonePattern: /(\+)(\d{2})(\d{2})(\d{3})(\d{4})/,
    tinyMCEDates: ["%H:%M:%S", "%Y-%m-%d", "%I:%M:%S %p"],
    tinyMCELang: "en_GB",
  },
};

export default supportedLocales;
