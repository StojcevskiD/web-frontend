import i18next from "i18next";
import lan_en from "./languages/en";
import lan_mk from "./languages/mk";

const i18n = () => {
    i18next.init({
        interpolation: {escapeValue: false},  // React already does escaping
        lng: localStorage.getItem("lng") === 'en' ? 'en' : 'mk',                            // language to use
        resources: {
            en: {
                lang: lan_en
            },
            mk: {
                lang: lan_mk
            },
        },
    });
}
export default i18n;