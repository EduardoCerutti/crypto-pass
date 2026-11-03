import { I18n } from "i18n-js"
import en from "./locales/en"
import es from "./locales/es"
import pt from "./locales/pt"

// Hermes ships Intl, so the device language is available without a native
// module. Unicode extensions ("-u-nu-latn") are dropped before matching.
function deviceLocale() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().locale.split("-u-")[0]
  } catch {
    return "en"
  }
}

const i18n = new I18n({ en, es, pt })
i18n.defaultLocale = "en"
// "pt-BR" falls back to "pt", and unsupported languages to English
i18n.enableFallback = true
i18n.locale = deviceLocale()

export const t = i18n.t.bind(i18n)
