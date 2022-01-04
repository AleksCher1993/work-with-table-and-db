import colorToHex from "./Converter.js";
//рендер формы данными получеными после нажатия на строку в таблице
export class RenderForms {
  #formSection;
  #formInputColor;
  constructor() {
    this.#formSection = document.querySelector("#formSection");
    this.#formInputColor = this.#formSection.querySelector(
      ".form__input__color"
    );
  }
  fillForm(data) {
    this.#formSection[0].value = data.name.firstName;
    this.#formSection[1].value = data.name.lastName;
    this.#formSection[2].value = data.phone;
    this.#formSection[3].value = data.about;
    this.#formInputColor.value = colorToHex(data.eyeColor);
  }
}
