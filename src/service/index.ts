import DataState from "../store/data";
import Settings from "../store/settings";
import Language from "../language";
import Config from "../config";

class Service {
    get data(){
        return DataState;
    }

    get settings(){
        return Settings;
    }

    get language(){
        return Language;
    }

    get config(){
        return Config;
    }
}

export default Service;