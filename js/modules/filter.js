export class Filter {
  #maxLengthStr;
  #currentIndex;
  #currentLimit;
  constructor() {
    let currentPage = sessionStorage.getItem("currentPage")
      ? JSON.parse(sessionStorage.getItem("currentPage"))
      : [0, 9];
    this.#maxLengthStr = 80; //максимум 80 символов в столбце "описание"
    this.#currentIndex = currentPage[0]; //переменная(текущий индекс) для работы с таблицей на 10 строк
    this.#currentLimit = currentPage[1]; //переменная(максимальный индекс) для работы с таблицей на 10 срок
  }
  //getter и setter для полей currentIndex и currentLimit
  get currentIndex() {
    return this.#currentIndex;
  }
  set currentIndex(value) {
    return (this.#currentIndex = value);
  }
  get currentLimit() {
    return this.#currentLimit;
  }
  set currentLimit(value) {
    return (this.#currentLimit = value);
  }
  //Фильтрация текста в колонке таблицы 'Описание' на 80 символов
  filterTextAbout(str) {
    if (str.length > this.#maxLengthStr) {
      return str.slice(0, this.#maxLengthStr) + " ...";
    } else return str.slice(0, this.#maxLengthStr);
  }
  //Фильтрация постраничного вывода на 10 строк
  filterContent(data) {
    sessionStorage.setItem(
      "currentPage",
      JSON.stringify([this.#currentIndex, this.#currentLimit])
    );
    return data.filter((elem, index) => {
      if (index >= this.#currentIndex && index <= this.#currentLimit) {
        return elem;
      }
    });
  }
  //фильтр для сортировки таблицы при нажатии на соответствующие кнопки фильтраци filterSort(база данных, свойство полученное при нажатии на кнопку сортировки)

  filterSort(data, propName) {
    data.sort(function (a, b) {
      switch (propName) {
        case "firstName":
          if (a.name.firstName < b.name.firstName) {
            return -1;
          }
          break;
        case "lastName":
          if (a.name.lastName < b.name.lastName) {
            return -1;
          }
          break;
        case "about":
          if (a.about < b.about) {
            return -1;
          }
          break;
        case "eyeColor":
          if (a.eyeColor < b.eyeColor) {
            return -1;
          }
          break;
        default:
          break;
      }
    });
    return data;
  }
}
