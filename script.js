const content = document.querySelector("#content");
const foreground = document.querySelector("#foreground");
const background = document.querySelector("#background");
const size = document.querySelector("#range");
const canvas = document.querySelector("#qr-code");
const ctx = canvas.getContext("2d");
const generate = document.querySelector(".primary-btn");
const btns = document.querySelectorAll(".outline-btn");
const circles = document.querySelectorAll(".circle");

foreground.value = "#000000";
background.value = "#FFFFFF";
foreground.addEventListener("change", () => {
  document.documentElement.style.setProperty("--foreground", foreground.value);
});

background.addEventListener("change", () => {
  document.documentElement.style.setProperty("--background", background.value);
});

generate.addEventListener("click", () => {
  const listData = content.value.split("\n");
  for (let i = 0; i < listData.length; i++) {
    canvas.innerHTML = "";
    //draw qr code on canvas
    new QRious({
      element: canvas,
      value: listData[i],
      background: background.value,
      foreground: foreground.value,
      size: size.value,
      padding: 50,
    });
    const link = document.createElement("a");

    ctx.font = `${50}px sans-serif`;
    ctx.fillStyle = foreground.value;
    ctx.fillText(
      "Macris",
      canvas.width / 2 - ctx.measureText("Macris").width / 2,
      canvas.height / 2 + -260
    );

    //draw text on canvas
    ctx.font = `${50}px sans-serif`;
    ctx.fillStyle = foreground.value;
    ctx.fillText(
      listData[i],
      canvas.width / 2 - ctx.measureText(listData[i]).width / 2,
      canvas.height / 2 + 280
    );
    link.download = `${listData[i]}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
});

generate.addEventListener("click", () => {
  content.innerHTML = "";
  DownloadQRCodes();
});
