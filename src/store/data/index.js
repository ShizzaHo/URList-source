import { makeAutoObservable, toJS } from "mobx"

class DataState {
    data = {
        categories: [

        ],
        links: [

        ],
    }

    constructor() {
        makeAutoObservable(this)
    }

    getData(){
        return toJS(this.data);
    }

    setData(newData){
        this.data = newData;
    }

    getCategories(){
        return toJS(this.data.categories);
    }

    getCategory(id){
        const finded = this.getCategories().find((item)=>{
            return item.id == id
        })
        return toJS(finded);
    }

    editCategory(id, newObject){
        const filtered = this.getCategories().filter((item)=>{
            return item.id !== id
        })
        this.data.categories = [...filtered, newObject]
        this.saveDataToLocalStorage()
    }

    deleteCategory(id){
        const filtered = this.getCategories().filter((item)=>{
            return item.id !== id
        })
        this.deleteListsFromParent(id)
        this.data.categories = [...filtered]
        this.saveDataToLocalStorage()
    }

    deleteListsFromParent(parentID){
        const filtered = this.getLinks().filter((item)=>{
            return item.parentID !== parentID
        })
        this.data.links = [...filtered]
        this.saveDataToLocalStorage()
    }

    getLinks(){
        return toJS(this.data.links);
    }

    getLink(id){
        const finded = this.getLinks().find((item)=>{
            return item.id == id
        })
        return toJS(finded);
    }

    createNewCategory(newObject){
        this.data = {
            ...this.getData(),
            categories: [...this.getCategories(), newObject]
        }
        this.saveDataToLocalStorage()
    }

    createNewLink(newObject){
        this.data = {
            ...this.getData(),
            links: [...this.getLinks(), newObject]
        }
        this.saveDataToLocalStorage()
    }

    editLink(id, newObject){
        const filtered = this.getLinks().filter((item)=>{
            return item.id !== id
        })
        this.data.links = [...filtered, newObject]
        this.saveDataToLocalStorage()
    }

    deleteLink(id){
        const filtered = this.getLinks().filter((item)=>{
            return item.id !== id
        })
        this.data.links = [...filtered]
        this.saveDataToLocalStorage()
    }

    loadDataFromLocalStorage(){
        const newData = JSON.parse(localStorage.getItem("URLIST_DATA"));
        if (newData != undefined) {
            this.setData(newData);
        }
    }

    saveDataToLocalStorage(){
        localStorage.setItem("URLIST_DATA", JSON.stringify(toJS(this.data)))
    }

    exportDataToJSON(){
        return JSON.stringify(toJS(this.data));
    }

    importFromJson(data) {
        const newData = data;
        localStorage.setItem("URLIST_DATA", newData)
        console.log(1);
    }
}

export default new DataState();