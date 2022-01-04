//отпрака GET запроса для рендеринга таблицы
//использовать JSON-server
export class getDate {
  constructor() {}
  get db() {
    return fetch("http://localhost:3000/JSON").then((data) => data.json()); // JSON-server
  }
}
