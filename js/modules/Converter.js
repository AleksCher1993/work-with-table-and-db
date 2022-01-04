//конвертирует текст цвета в RGBA для input[type=color]
function colorToRGBA(color) {
  var cvs, ctx;
  cvs = document.createElement("canvas");
  cvs.height = 1;
  cvs.width = 1;
  ctx = cvs.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  return ctx.getImageData(0, 0, 1, 1).data;
}

function byteToHex(num) {
  return ("0" + num.toString(16)).slice(-2);
}

function colorToHex(color) {
  var rgba, hex;
  rgba = colorToRGBA(color);
  hex = [0, 1, 2]
    .map(function (idx) {
      return byteToHex(rgba[idx]);
    })
    .join("");
  return "#" + hex;
}

export default colorToHex;
