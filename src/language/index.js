import russian from './ru';
import english from './en';
import chinese from './zh';
import ukrain from './uk';


function selectLanguage(lang){
    switch (lang) {
        case "russian":
            return russian;
        case "english":
            return english;
        case "chinese":
            return {...english, ...chinese};
        case "ukrain":
            return {...russian, ...ukrain};
        default:
            return english;
    }
}

export default selectLanguage(localStorage.getItem("URLIST_LANG"));