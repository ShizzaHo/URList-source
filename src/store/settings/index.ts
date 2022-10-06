import { makeAutoObservable, toJS } from "mobx"
import { Isettings } from '../../interfaces/index';

class SettingsState {
    settings: Isettings = {
        showIcons: true,
        guideStart: false,
        showDeleteButton: false,
        swipeIcons: true,
    }

    constructor() {
        makeAutoObservable(this)
    }

    getSettings(): Isettings {
        return toJS(this.settings);
    }

    setSettings(newData: Isettings){
        this.settings = newData;
    }

    saveSettingsToLocalStorage(){
        localStorage.setItem("URLIST_SETTINGS", JSON.stringify(toJS(this.settings)))
    }

    loadSettingsFromLocalStorage(){
        const newData = JSON.parse(localStorage.getItem("URLIST_SETTINGS") || '{}');
        if (newData != undefined) {
            this.setSettings({...this.getSettings(), ...newData});
        }
    }

    toggleSetting(setting: string){
        const state = this.getSettings()[setting];
        this.setSettings({
            ...this.getSettings(),
            [setting]: !state,
        })
        this.saveSettingsToLocalStorage()
    }
}

export default new SettingsState();