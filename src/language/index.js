import russian from './ru';
import english from './en';
import chinese from './zh';


function selectLanguage(lang){
    switch (lang) {
        case "russian":
            return russian;
        case "english":
            return english;
        case "chinese":
            return chinese;
        default:
            return english;
    }
}

export default selectLanguage(localStorage.getItem("URLIST_LANG"));