//отправка PUT запроса с измененными данными в форме для изменения базы данных
//Использовать JSON-server
export class PutData {
  constructor() {}
  putData(data) {
    return fetch("http://localhost:3000/JSON/" + data.id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((data) => data.text());
  }
}
