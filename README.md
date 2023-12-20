# Ajax-type-ahead

這個作品是以 JavaScript 30 Day 6 Ajax Type Ahead 的[範例](https://codepen.io/tariso/pen/LyoaRM)為基礎，並使用React.js改寫而來。

## Development
```
yarn dev
```

本專案有架設mock server，可透過指令 `yarn dev:devServer` 開啟mock server。
當開啟mock server後，本專案既有的 HTTP 請求，都會改向位於 `http://localhost:8080` 的mock server發出請求，而非遠端的server。


## Build & Deploy
```
yarn deploy
```
本專案目前僅使用 github-pages部署，且僅有部署靜態頁面。
