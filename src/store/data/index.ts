import { makeAutoObservable, toJS } from 'mobx';
import config from '../../config';
import language from '../../language';
import { validateJSON } from '../../utils/valid';
import { Icategory, Ilink, Imeta, Idata } from '../../interfaces/index';

class DataState {
  data: Idata = {
    meta: { name: 'URLIST', version: config.thisVersion },
    categories: [],
    links: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  getData(): Idata {
    return toJS(this.data);
  }

  setData(newData: Idata) {
    this.data = {...this.getData(), ...newData};
  }

  getCategories(): Array<Icategory> {
    return toJS(this.data.categories);
  }

  getCategory(id: string): (Icategory | undefined){
    const finded = this.getCategories().find((item: any) => {
      return item.id == id;
    });
    return toJS(finded);
  }

  editCategory(id: string, newObject: (Icategory | any) ) {
    const filtered = this.getCategories().filter((item: any) => {
      return item.id !== id;
    });
    this.data.categories = [...filtered, newObject];
    this.saveDataToLocalStorage();
  }

  deleteCategory(id: string) {
    const filtered = this.getCategories().filter((item) => {
      return item.id !== id;
    });
    this.deleteListsFromParent(id);
    this.data.categories = [...filtered];
    this.saveDataToLocalStorage();
  }

  deleteListsFromParent(parentID: string) {
    const filtered = this.getLinks().filter((item) => {
      return item.parentID !== parentID;
    });
    this.data.links = [...filtered];
    this.saveDataToLocalStorage();
  }

  getLinks() {
    return toJS(this.data.links);
  }

  getLink(id: string): (Ilink | undefined) {
    const finded = this.getLinks().find((item) => {
      return item.id == id;
    });
    return toJS(finded);
  }

  createNewCategory(newObject: Icategory) {
    this.data = {
      ...this.getData(),
      categories: [...this.getCategories(), newObject],
    };
    this.saveDataToLocalStorage();
  }

  createNewLink(newObject: Ilink) {
    this.data = {
      ...this.getData(),
      links: [...this.getLinks(), newObject],
    };
    this.saveDataToLocalStorage();
  }

  editLink(id: string, newObject: any) {
    const filtered = this.getLinks().filter((item) => {
      return item.id !== id;
    });
    this.data.links = [...filtered, newObject];
    this.saveDataToLocalStorage();
  }

  deleteLink(id: string) {
    const filtered = this.getLinks().filter((item) => {
      return item.id !== id;
    });
    this.data.links = [...filtered];
    this.saveDataToLocalStorage();
  }

  loadDataFromLocalStorage() {
    const newData = JSON.parse(localStorage.getItem('URLIST_DATA') || '{}');
    if (newData != undefined) {
      this.setData(newData);
    }
  }

  saveDataToLocalStorage() {
    localStorage.setItem('URLIST_DATA', JSON.stringify(toJS(this.data)));
  }

  exportDataToJSON(): string {
    return JSON.stringify(toJS(this.data));
  }

  importFromJson(data: string) {
    const newData = data;
    if (validateJSON(JSON.stringify(newData))) {
      localStorage.setItem('URLIST_DATA', newData);
    } else {
      alert(language.importError_validation);
    }
  }

  categoryFavoriteToggle(id: string) {
    const category = this.getCategory(id) || {isFavorite: false};
    if (category.isFavorite) {
      category.isFavorite = false;
    } else {
      category.isFavorite = true;
    }
    this.editCategory(id, category);
    this.saveDataToLocalStorage();
  }

  linkFavoriteToggle(id: string) {
    const link = this.getLink(id) || {isFavorite: false};
    if (link.isFavorite) {
      link.isFavorite = false;
    } else {
      link.isFavorite = true;
    }
    this.editLink(id, link);
    this.saveDataToLocalStorage();
  }

  getMeta(): (Imeta | undefined) {
    return toJS(this.data.meta);
  }

  setMeta(newObj: Imeta) {
    this.setData({
      ...this.getData(),
      meta: newObj,
    });
    this.saveDataToLocalStorage();
  }
}

export default new DataState();
