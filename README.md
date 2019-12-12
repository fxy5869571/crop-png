# crop-png

一个去除 png 图片空白区域的小插件

## 安装

```shell
npm install --save crop-png
```

## 使用

```js
import { crop } from "crop-png";

import src from "./cloth_7_3.png";

export default class extends React.Component {
  state = {
    url: ""
  };

  async componentDidMount() {
    // src可以是本地图片或者网络图片
    const url = await crop(src);

    this.setState({ url });
  }

  render() {
    const { url } = this.state;
    return <img src={url} alt="" style={{ width: 100 }} />;
  }
}
```
