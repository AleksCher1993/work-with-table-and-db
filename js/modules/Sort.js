import { getDate } from "./getDate.js";
import { Filter } from "./filter.js";
import { Render } from "./Render.js";
import { renderNav } from "./navSetting.js";
//Сортировка столбцов при нажатии на кнопку
export class Sort {
  #tableSection;
  #tableHead;
  #propName;
  constructor() {
    this.#tableSection = document.querySelector(".table__section"); //получение таблицы
    this.#tableHead = this.#tableSection.querySelector("thead"); //получение thead
  }
  sortHandler() {
    this.#tableHead.addEventListener("click", (e) => {
      const t = e.target;
      if (t.closest("span")) {
        const getdata = new getDate();
        const filter = new Filter();

        let td = t.parentElement; //получение td в thead
        this.#propName = td.dataset.propName; //получение свойства(data-prop-name) хранящееся в td в thead
        sessionStorage.setItem("propName", this.#propName); //запись значения свойства(data-prop-name) в sessionStorage
        //генерация таблицы при нажатии на сортировку
        getdata.db
          .then((data) =>
            Render.render(
              filter.filterContent(filter.filterSort(data, this.#propName))
            )
          )
          .then((e) => {
            renderNav();
          });
      }
    });
  }
}
