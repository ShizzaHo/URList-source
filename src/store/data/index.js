import { makeAutoObservable, toJS } from "mobx"
import config from "../../config";

class DataState {
    data = {
        meta: {name: "URLIST", version: config.thisVersion},
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
    }

    categoryFavoriteToggle(id){
        const category = this.getCategory(id);
        if (category.isFavorite) {
            category.isFavorite = false;
        } else {
            category.isFavorite = true;
        }
        this.editCategory(id, category);
        this.saveDataToLocalStorage()
    }

    linkFavoriteToggle(id){
        const link = this.getLink(id);
        if (link.isFavorite) {
            link.isFavorite = false;
        } else {
            link.isFavorite = true;
        }
        this.editLink(id, link);
        this.saveDataToLocalStorage()
    }

    getMeta(){
        return toJS(this.data.meta);
    }

    setMeta(newObj){
        this.setData({
            ...this.getData(),
            meta: newObj
        })
        this.saveDataToLocalStorage()
    }
}

export default new DataState();