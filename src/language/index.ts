import russian from './ru';
import english from './en';
import chinese from './zh';
import ukrain from './uk';
import france from './fr';

const langs = {
    langName_ru: 'Русский',
    langName_en: 'English',
    langName_cz: '中文',
    langName_uk: 'Українська (не повний переклад)',
    langName_fr: "Français",
}

const customLang = () => {
    if (localStorage.getItem('URLIST_CUSTOMLANG') != undefined) {  
        return JSON.parse(localStorage.getItem('URLIST_CUSTOMLANG'));
    } else {
        return "{}";
    }
}

function selectLanguage(lang: (string | null)){
    switch (lang) {
        case "russian":
            return {...langs, ...russian};
        case "english":
            return {...langs, ...english};
        case "chinese":
            return {...langs, ...english, ...chinese};
        case "ukrain":
            return {...langs, ...russian, ...ukrain};
        case "france":
            return {...langs, ...english, ...france};
        case "custom":
            
            return {...langs, ...english, ...customLang()};
        default:
            return english;
    }
}

export default selectLanguage(localStorage.getItem("URLIST_LANG"));