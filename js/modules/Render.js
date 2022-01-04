import colorToHex from "./Converter.js";
import { Filter } from "./filter.js";
const filter = new Filter();
//рендер таблицы данными
export class Render {
  constructor() {
    this.mainSectionTableBody = document.querySelector("#mainSectionTableBody");
  }
  static render(data) {
    mainSectionTableBody.innerHTML = "";
    data.forEach((elem) => {
      mainSectionTableBody.insertAdjacentHTML(
        "beforeend",
        `
      <tr data-key=${elem.id}>
      <td>${elem.name.firstName}</td>
      <td>${elem.name.lastName}</td>
      <td class="cell expand-maximum-on-hover">
      ${filter.filterTextAbout(elem.about)}
      </td>
      <td><input type="color" disabled value="${colorToHex(
        elem.eyeColor
      )}"/></td>
      </tr>
      `
      );
    });
  }
}
