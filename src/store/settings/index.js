import { makeAutoObservable, toJS } from "mobx"

class SettingsState {
    settings = {
        showIcons: true,
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
        localStorage.setItem("URLIST_SETTINGS", JSON.stringify(toJS(this.data)))
    }

    loadSettingsFromLocalStorage(){
        const newData = JSON.parse(localStorage.getItem("URLIST_SETTINGS"));
        if (newData != undefined) {
            this.setData(newData);
        }
    }

    toggleSetting(setting){
        const state = this.getSettings()[setting];
        this.setSettings({
            ...this.getSettings(),
            [setting]: !state,
        })
        console.log(this.getSettings().showIcons);
    }
}

export default new SettingsState();