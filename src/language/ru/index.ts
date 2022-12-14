const words = {
    category: "Категории",
    settings: "Настройки",
    settings_importExport: "Импорт и экспорт данных",
    settings_selectLanguage: "Выбрать язык интерфейса",
    settings_selectLanguage_title: "Выберите язык:",
    settings_showIcons: "Показывать иконки у категорий и ссылок",
    settings_guide: "Пройти обучение",
    settings_userAgreement: "Пользовательское соглашение и отказ от ответственности",
    settings_about: "О приложении",
    settings_showDeleteButton: "Показать кнопку удаления при свайпе",
    settings_swipeIcons: "Иконки вместо текста при свайпе",
    settings_dateBlock: 'Данные',
    settings_interfaceBlock: 'Интерфейс',
    settings_informationBlock: 'Информация',

    importExport: "Импорт и экспорт данных",
    importExport_import: "Импорт",
    importExport_export: "Экспорт",
    importExport_exportJSON: "Экспортировать данные в .JSON файл",
    importExport_exportJSON_2: "Экспортировать данные в строку",
    importExport_importJSON: "Импортировать данные из .JSON файла",
    importExport_importJSON_2: "Импортировать данные из строки",
    importExport_importJSON_3: "Импортировать данные из Linkbox",
    importExport_manual: "Инструкция",

    about: "О приложении",
    about_subtitle: "Больше ваши ссылки никогда не потеряются, ведь теперь вы можете хранить их в удобном кроссплатформенном приложении URList! Создавайте категории, и храните в них тематические ссылки, удобно открывая их в один клик!",
    about_developer: "Разработчик:",
    about_version: "Версия приложения:",
    about_4pda: "Тема приложения на 4PDA",
    about_site: "Официальный сайт проекта",
    about_donat: "Поддержать проект",
    about_telegram: "Канал разработчика в Telegram",
    about_github: "Исходный код на GitHub",

    universalPage_inputPlaceholder: "Введите/скопируйте необходимые данные",
    universalPage_info1: "После взаимодейтсвия с этим окном, обязательно перезапустите приложение для применения изменений",
    universalPage_info2: "Чтобы применить изменения нажмите на круглую кнопку снизу",

    newCategory: "Новая категория",
    newCategory_name: "Название категории",
    newCategory_desc: "Описание категории",

    newLink: "Новая ссылка",
    newLink_name: "Название ссылки",
    newLink_url: "URL-адрес",
    newLink_errorTitle: "Ссылка обязательно должна содержать следующие подстроки:",
    newLink_errorItem1: "Подстроку \"https://\" или \"http://\"",
    newLink_errorItem2: "Точку",

    editCategory: "Редактирование категории",
    editCategory_name: "Название категории",
    editCategory_desc: "Описание категории",
    editCategory_delete_title: "Вы уверены?",
    editCategory_delete_desc: "Отменить удаление будет невозможно!",
    editCategory_delete_OK: "Отмена",
    editCategory_delete_DELETE: "Удалить",

    editLink: "Редактирование ссылки",
    editLink_name: "Название ссылки",
    editLink_url: "URL-адрес",
    editLink_errorTitle: "Ссылка обязательно должна содержать следующие подстроки:",
    editLink_errorItem1: "Подстроку \"https://\" или \"http://\"",
    editLink_errorItem2: "Точку",

    sort: "Метод сортировки",
    sort_lastСhange: "По умолчанию (от последнего изменения)",
    sort_alphabetically1: "По алфавиту (А-Я)",
    sort_alphabetically2: "По алфавиту (Я-А)",

    categoryItem_edit: "Редактировать",
    categoryItem_favoriteAdd: "В избранное",
    categoryItem_favoriteRemove: "Удалить из избранного",

    universal_basicInformation: "Базовая информация",
    universal_customization: "Кастомизация",
    universal_iconColor: "Цвет иконки",
    universal_clickToColorSelect: "Нажмите на кружок для выбора цвета",
    universal_iconType: "Тип иконки",
    universal_firstWord: "Первая буква",
    universal_nothing: "Ничего",
    universal_favicon: "Favicon с сайта",
    universal_onlyAndroid: "Данная функция доступна только для Android устройств",

    guide_dialog_title: "Впервые здесь?",
    guide_dialog_desc: "Хотите пройти обучение по управлению в интерфейсе? (Позже обучение можно будет пройти в настройках)",
    guide_dialog_OK: "Начать обучение",
    guide_dialog_NO: "Закрыть",

    guide: "Обучение",
    guide_slide1_title: "Базовое управление списками",
    guide_slide1_desc: "Для изменения списков, или для добавления в избранное достаточно просто свайпнуть лист влево или вправо, чтобы открыть категорию или ссылку, просто нажмите на нее",
    guide_slide2_title: "Все для вашего удобства",
    guide_slide2_desc: "Изменяйте иконки как вам угодно, меняйте цвета или иконки у ваших категорий и ссылок (Отключить можно в найтройках)",
    guide_slide3_title: "Добавляйте все необходимое в избранное",
    guide_slide3_desc: "Больше вам не придется искать самые важные ссылки среди кучи других, теперь для этого сущесутвуют избранные!",
    guide_slide4_title: "Вот и все",
    guide_slide4_desc: "Теперь вы полностью готовы к использованию URList, приятного использования!",
    guide_slide4_button: "Закрыть обучение",

    export_complete: "Файл сохранен экспорта успешно сохранен по пути: %PATH%", // %PATH% - Instead of this value the path to the file will appear
    import_complete: "Данные успешно импортированы",
    exportError_dir: "ОШИБКА: Невозможно создать папку, проверьте разрешения приложения",
    exportError_file: "ОШИБКА: Невозможно создать файл, проверьте разрешения приложения",
    importError_validation: "ОШИБКА: Импортированные данные повреждены",
    import_linkBox_converting: "Идет процесс конвертирования данных из Linkbox в конфиг URList, пожалуйста подождите...",

    search: "Поиск",

    tabbar_basicInformation: "Базовая информация",
    tabbar_customization: "Внешний вид",

    langName_custom: "Выбрать другой язык из .JSON файла",

    customLanguage_wait: "Ожидание выбора файла",
    customLanguage_cheсking: "Проверка...",
    customLanguage_prompt: "Введите данные из .json файла в строку ниже",
    customLanguage_error: "Ошибка выбора файла",
}

export default words;