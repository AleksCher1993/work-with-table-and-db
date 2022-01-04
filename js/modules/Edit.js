import { Filter } from "./filter.js";
import { getDate } from "./getDate.js";
import { PutData } from "./PutData.js";
import { Render } from "./Render.js";
import { RenderForms } from "./RenderForms.js";

export class Edit {
  #mainSectionTableBody;
  #formSection;
  #currentIdFromTR;
  #getdata;
  #formButtonSend;
  #formInputColor;
  #mainSectionForm;
  #formClose;
  constructor() {
    //получение table->tbody
    this.#mainSectionTableBody = document.querySelector(
      "#mainSectionTableBody"
    );
    this.#formSection = document.querySelector("#formSection"); //получение формы
    this.#formClose = document.querySelector(".form__close"); //получение кнопки закрыть в форме
    this.#getdata = new getDate(); //создание экземпляра класса getDate для получения GET запроса
    this.renderForm = new RenderForms(); //создание экземпляра класса RenderForms для заполнения формы данными из таблицы
    this.#formButtonSend = document.querySelector("#formButtonSend"); //получение кнопки отправить в форме
    this.#mainSectionForm = document.querySelector(".main__section__form"); //получение блока с формой
    //получение инпута[type=color] в форме
    this.#formInputColor = this.#formSection.querySelector(
      ".form__input__color"
    );
  }
  //рендеринг формы данными получеными из таблицы при клике на строку
  render() {
    this.#mainSectionTableBody.addEventListener("click", (e) => {
      this.#mainSectionForm.style.display = "flex"; //сделать форму видимой
      this.#currentIdFromTR = e.target.closest("tr").dataset.key; //получение data-set строки в таблице
      //найти элемент в базе по ключу и заполнить форму данными
      this.#getdata.db.then((data) => {
        data.find((elems) => {
          if (elems.id === this.#currentIdFromTR) {
            this.renderForm.fillForm(elems);
          }
        });
      });
    });
  }
  //скрыть форму по нажатии на кнопку закрыть
  formCloseHandler() {
    this.#formClose.addEventListener("click", () => {
      this.#mainSectionForm.style.display = "";
    });
  }
  //отправить PUT запрос для изменения базы данными полученными от измененной формы
  sendPUT() {
    this.#formButtonSend.addEventListener("click", (e) => {
      const filter = new Filter();
      e.preventDefault();
      const sendObj = {
        id: this.#currentIdFromTR,

        name: {
          firstName: this.#formSection[0].value,

          lastName: this.#formSection[1].value,
        },

        phone: this.#formSection[2].value,

        about: this.#formSection[3].value,
        eyeColor: this.#formInputColor.value,
      };
      const putdata = new PutData();
      //сделать изменения в базе данных и перерендарить таблицу с новыми данными
      putdata.putData(sendObj).then(() => {
        return this.#getdata.db.then((data) => {
          Render.render(filter.filterContent(data));
          this.#mainSectionForm.style.display = "";
        });
      });
    });
  }
}
