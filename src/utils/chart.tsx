export const legendPos:{[key: string]:{}} = {
  left:{ // left
    top: 'center',
    left: 10,
    orient: 'vertical',
  },
  top:{ // top
    top: '5%',
    left: 'center',
  },
  right:{ // right
    top: 'center',
    right: 10,
    orient: 'vertical',
  },
  bottom:{ // bottom
    bottom: '5%',
    left: 'center',
  },
}


export const hexToRGBA = (_color:string, _opacity:number) => {
  let sColor = _color.toLowerCase();
  //十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
          let sColorNew = "#";
          for (let i = 1; i < 4; i += 1) {
              sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
      }
      //处理六位的颜色值
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + _opacity + ")";
  }
  return sColor;
}