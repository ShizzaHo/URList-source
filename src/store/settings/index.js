import { makeAutoObservable, toJS } from "mobx"

class SettingsState {
    settings = {
        showIcons: true,
        guideStart: false,
    }

    constructor() {
        makeAutoObservable(this)
    }

    getSettings(){
        return toJS(this.settings);
    }

    setSettings(newData){
        this.settings = newData;
    }

    saveSettingsToLocalStorage(){
        localStorage.setItem("URLIST_SETTINGS", JSON.stringify(toJS(this.settings)))
    }

    loadSettingsFromLocalStorage(){
        const newData = JSON.parse(localStorage.getItem("URLIST_SETTINGS"));
        if (newData != undefined) {
            this.setSettings({...this.getSettings(), ...newData});
        }
    }

    toggleSetting(setting){
        const state = this.getSettings()[setting];
        this.setSettings({
            ...this.getSettings(),
            [setting]: !state,
        })
        this.saveSettingsToLocalStorage()
    }
}

export default new SettingsState();