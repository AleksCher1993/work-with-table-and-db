import { Filter } from "./filter.js";
import { getDate } from "./getDate.js";
import { Render } from "./Render.js";
//инициализация таблицы с базы данных
export class Init {
  static render() {
    const getdata = new getDate(); //создание экземпляра класса для отправки GET запроса
    const filter = new Filter(); //создание экземпляра класса для фильтрации данных
    const propName = sessionStorage.getItem("propName"); //получение с sessionStorage данных для сортировки элементов таблицы
    sessionStorage.removeItem("td_key");
    //рендеринг таблицы
    getdata.db.then((data) =>
      Render.render(filter.filterContent(filter.filterSort(data, propName)))
    );
  }
}
