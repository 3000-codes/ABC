# 浏览器拓展开发

## 1. 开始

新建一个文件夹，命名为`browser-extension`，在文件夹中新建一个[manifest.json](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/manifest.json)文件，内容如下：

```json
{
  "manifest_version": 2, // 版本号,必须,2已废弃
  "name": "browser-extension", // 必须
  "version": "0.0.1", // 必须
  "description": "My Extension", // 选填,会在拓展管理面板看到
  "icons": {
    // 选填,为拓展设置图标
    // 16,48,128分别对应不同的尺寸,后面是文件路径
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  }
}
```
