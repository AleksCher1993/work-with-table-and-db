import { Filter } from "./filter.js";
import { getDate } from "./getDate.js";
import { navSetting, renderNav } from "./navSetting.js";
import { Render } from "./Render.js";
import { Sort } from "./Sort.js";

export const arrowBtn = () => {
  let filter = new Filter(); //получение обьекта Filter
  let getdata = new getDate();
  const prevArrow = document.querySelector("#prevArrow"); //Кнопка prev
  const nextArrow = document.querySelector("#nextArrow"); //Конпка next
  const currentIndex = 10; //увеличивать/уменьшать index на 10 страниц для постраничного вывода
  const sort = new Sort();

  //событие клик на кнопке prev
  prevArrow.addEventListener("click", function prevArrowId() {
    const propName = sessionStorage.getItem("propName");
    //отправка get запроса для отображение данных на странице
    getdata.db
      .then((data) => {
        if (filter.currentIndex <= data.length && filter.currentIndex > 0) {
          //если 10 элементов из базы удовлетворяют требованию то получить предыдущие 10 элементов из базы, иначе ничего не делать
          filter.currentIndex -= currentIndex;
          filter.currentLimit -= currentIndex;
          Render.render(
            filter.filterContent(filter.filterSort(data, propName))
          );
        } else {
          return;
        }
      })
      .then(() => {
        renderNav();
      });
  });
  //событие клик на кнопке next
  nextArrow.addEventListener("click", function nextArrowId() {
    const propName = sessionStorage.getItem("propName");
    //отправка get запроса для отображение данных на странице
    getdata.db
      .then((data) => {
        if (
          filter.currentLimit < data.length &&
          filter.currentLimit != data.length - 1
        ) {
          //если 10 элементов из базы удовлетворяют требованию то получить следующие 10 элементов из базы, иначе ничего не делать
          filter.currentIndex += currentIndex;
          filter.currentLimit += currentIndex;
          Render.render(
            filter.filterContent(filter.filterSort(data, propName))
          );
        } else {
          return;
        }
      })
      .then((e) => {
        renderNav();
      });
  });
};
