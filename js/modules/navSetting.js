import { Init } from "./Init.js";
//Меню настроек навигации
export const navSetting = () => {
  const navSectionButton = document.querySelector(".nav__section__button");
  const navSectionHidden = document.querySelector(".nav__section__hidden");
  const resetBtn = navSectionHidden.querySelector("#reset");
  const tableSection = document.querySelector(".table__section");
  navSectionButton.addEventListener("click", () => {
    navSectionHidden.classList.toggle("hide");
  });
  //сброс всех настроек навигации
  resetBtn.addEventListener("click", () => {
    sessionStorage.removeItem("propName");
    //Сброс всех настроек до уровня Инициализации
    Init.render();
    //Убирает у всех кнопок в настройках навигации класс active
    navSectionHidden
      .querySelectorAll("ul li")
      .forEach((elem) => [elem.classList.remove("active")]);
    //Убирает у table>thead класс btnclose(т.е. убирает display:block)
    tableSection.querySelectorAll("thead tr td").forEach((elem) => {
      elem.classList.remove("btnclose");
    });
  });
  //настройки сворачивания элементов таблицы при нажатии на кнопки в меню настроек навигации
  navSectionHidden.addEventListener("click", (e) => {
    //получение  кнопки(в списке) в меню настроек навигации
    const t = e.target;
    if (t.closest("li[data-key]")) {
      //получение у кнопки значение атрибута data-key
      const key = t.dataset.key;
      //Существует ли в SessionStorage элемент по ключу td_key? если да- вернуть массив с sessionStorage, усли нет -вернуть вернуть пустой массив
      const tdKey = sessionStorage.getItem("td_key")
        ? JSON.parse(sessionStorage.getItem("td_key"))
        : [];
      //Проверка, если у кнопки существует класс active(значит sessinoStorage содержит значение кнопки навигации), то удалить у массива tdKey значение, которое содержится у кнопки в dataset, иначе добавить значение в массив
      if (t.classList.contains("active")) {
        tdKey.forEach((elem, index) => {
          if (elem == key) {
            tdKey.splice(index, 1);
          }
        });
      } else {
        tdKey.push(key);
      }
      //перезапись в SessionStorage значения
      sessionStorage.setItem("td_key", JSON.stringify(tdKey));
      //Добавить к нажатой кнопке в меню настроек навигации класс active
      t.classList.toggle("active");
      //Добавить класс btnclose(т.е. display:block) для колонок таблицы в соответствии с настройками выше(при нажатии на кнопки в меню настроек навигации)
      const tds = tableSection.querySelectorAll(
        `thead tr td:nth-child(${key}),tbody tr td:nth-child(${key})`
      );
      tds.forEach((elem) => {
        elem.classList.toggle("btnclose");
      });
    }
  });
};

//рендеринг таблицы с текущими настройками
export const renderNav = () => {
  const tableSection = document.querySelector(".table__section"); //получение таблицы

  const tdKey = sessionStorage.getItem("td_key") //получение значений из sessionStorage
    ? JSON.parse(sessionStorage.getItem("td_key"))
    : [];
  const elemsList = [];

  tdKey.forEach((elem) => {
    //добавление display block для td в таблице
    elemsList.push(
      tableSection.querySelectorAll(
        `thead tr td:nth-child(${elem}),tbody tr td:nth-child(${elem})`
      )
    );
  });
  elemsList.forEach((tds) => {
    tds.forEach((td) => {
      td.classList.add("btnclose");
    });
  });
};
