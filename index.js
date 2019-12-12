// 获取像素点坐标
const getXYWH = (arr, row) => {
  const list = [];
  for (let i = 0; i < arr.length; i += 4) {
    list.push({ r: arr[i], g: arr[i + 1], b: arr[i + 2], a: arr[i + 3] });
  }
  const pixels = [];
  let top = { x: 0, y: 0 };
  let bottom = { x: 0, y: 0 };
  let left = { x: 0, y: 0 };
  let right = { x: 0, y: 0 };
  for (let i = 0; i < list.length; i += row) {
    const item = list.slice(i, i + row);
    pixels.push(item);
  }
  pixels.forEach((item, y) => {
    item.forEach((pixel, x) => {
      pixel.y = y;
      pixel.x = x;
      if (pixel.a > 0) {
        if (y >= bottom.y) {
          bottom = pixel;
        }
        if (y < top.y || top.y === 0) {
          top = pixel;
        }
        if (x >= right.x) {
          right = pixel;
        }
        if (x < left.x || left.x === 0) {
          left = pixel;
        }
      }
    });
  });
  return {
    x: left.x - 2,
    y: top.y - 2,
    width: right.x - left.x + 4,
    height: bottom.y - top.y + 4
  };
};

// 裁剪图片
export const crop = (url, opacity = 0.1) =>
  new Promise(resove => {
    const original = document.createElement("canvas");
    const img = document.createElement("img");
    img.src = url;
    img.onload = () => {
      const width = Math.floor(img.width * opacity);
      const height = Math.floor(img.height * opacity);
      const ctx = original.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height);
      const pixels = [...data.data];
      const positions = getXYWH(pixels, width);
      const target = document.createElement("canvas");
      const targetContext = target.getContext("2d");
      target.height = Math.floor(positions.height / opacity);
      target.width = Math.floor(positions.width / opacity);
      targetContext.drawImage(
        img,
        Math.floor(positions.x / opacity),
        Math.floor(positions.y / opacity),
        Math.floor(positions.width / opacity),
        Math.floor(positions.height / opacity),
        0,
        0,
        Math.floor(positions.width / opacity),
        Math.floor(positions.height / opacity)
      );
      resove(target.toDataURL("image/png", 1));
    };
  });
