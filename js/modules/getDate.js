//отпрака GET запроса для рендеринга таблицы
//использовать JSON-server
export class getDate {
  constructor() {}
  get db() {
    return fetch("https://mytestapp-253712-default-rtdb.firebaseio.com/JSON").then((data) => data.json()); // JSON-server
  }
}
