import { Init } from "./modules/Init.js";
import { arrowBtn } from "./modules/arrowBtn.js";
import { Edit } from "./modules/Edit.js";
import { Sort } from "./modules/Sort.js";
import { navSetting } from "./modules/navSetting.js";

const edit = new Edit();
const sort = new Sort();

Init.render(); //инициализация таблицы
arrowBtn(); // подключение кнопок(стрелок) для перелистывания таблицы на 10 строк

//форма для редактирования
edit.render(); //подключение редактирования по клику на строку таблицы и заполнение формы
edit.sendPUT(); // изменяет базу данных методом PUT при отправки формы
edit.formCloseHandler(); // закрывает форму
//сортировка таблицы
sort.sortHandler();
//навигационные настройки для сокрытия столбцов таблицы
navSetting();
