import DataState from './index';

test('Category creation check', () => {
    DataState.createNewCategory({
        title: "test Name",
        desc: "test Desc", 
        id: "test ID", 
        iconColor: "test Color", 
        iconType: "test Type",
        isFavorite: false, 
    })

    expect(DataState.getCategory("test ID")).toEqual({
        title: "test Name",
        desc: "test Desc", 
        id: "test ID", 
        iconColor: "test Color", 
        iconType: "test Type",
        isFavorite: false, 
    });
});

test('Link creation check', () => {
    DataState.createNewCategory({
        title: "test Name",
        desc: "test Desc", 
        id: "test ID", 
        iconColor: "test Color", 
        iconType: "test Type",
        isFavorite: false, 
    })

    DataState.createNewLink({
        title: "test Name",
        url: "test Desc",
        parentID: "test ID",
        id: "test LINK ID",
        iconColor: "test Color", 
        iconType: "test Type", 
        isFavorite: false,
    })

    expect(DataState.getLink("test LINK ID")).toEqual({
        title: "test Name",
        url: "test Desc",
        parentID: "test ID",
        id: "test LINK ID",
        iconColor: "test Color", 
        iconType: "test Type", 
        isFavorite: false,
    });
});

