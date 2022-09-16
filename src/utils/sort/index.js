export const Sort = {
    lastСhange: "lastСhange",
    alphabetically1: "alphabetically1",
    alphabetically2: "alphabetically2",
}

export function SortList(array, sortMethod){
    let newArray = null;

    switch (sortMethod) {
        case Sort.lastСhange:
            newArray = array;
            break;
        case Sort.alphabetically1:
            newArray = array.sort((a, b) => {
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            break;
        case Sort.alphabetically2:
            newArray = array.sort((a, b) => {
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            });
            break;
        default:
            newArray = array;
            break;
    }

    return newArray;
}