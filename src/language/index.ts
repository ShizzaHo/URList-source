import russian from './ru';
import english from './en';
import chinese from './zh';
import ukrain from './uk';
import france from './fr';


function selectLanguage(lang: (string | null)){
    switch (lang) {
        case "russian":
            return russian;
        case "english":
            return english;
        case "chinese":
            return {...english, ...chinese};
        case "ukrain":
            return {...russian, ...ukrain};
        case "france":
            return {...english, ...france};
        default:
            return english;
    }
}

export default selectLanguage(localStorage.getItem("URLIST_LANG"));