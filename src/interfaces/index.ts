// SERVICE
export interface Iservice {
  [key: string]: any;
}

// SETTINGS 
export interface Isettings {
    [key: string]: boolean
}

//CATEGORY
export interface Icategory {
    title ?: (string | undefined);
    desc ?: (string | undefined);
    iconColor ?: string;
    iconType ?: string;
    isFavorite ?: boolean;
    id: string;
}

//LINK
export interface Ilink {
    title ?: string;
    url: string;
    parentID: string;
    id: string;
    iconColor ?: string;
    iconType ?: string;
    isFavorite ?: boolean;
}

//META
export interface Imeta {
  name ?: string;
  version ?: string;
}

//DATA
export interface Idata {
  meta?: Imeta;
  categories: Array<Icategory>;
  links: Array<Ilink>;
}