// 要使用 esbuild 不要把他以編譯到 es5 為目標，如想支持 IE 瀏覽器，是不支持的，如 const 就會編譯失敗
// --bundle 打包，bundle 會使用 tree-shaking 的模式 bundle
// --outdir= 導出目錄
// --outfile= 導出檔案路徑
// --target= 版本，如：esnext, es6...，對於 esnext 等高級 es 語法，如 const，也是編譯成 var，這種單純是作者的考量，因為 const 有額外的開銷，同樣的效果那就用 var 即可
// --platform= 編譯目標，如：node, browser, neutral
// --format= 編譯格式，如：cjs, iife, esm，目前無 umd 支持
// --watch 監聽檔案修改
// --define: 同rollup replace功能，如 --define:TEST=12
// --loader: 處理特殊導入，如：圖片 --loader:.png=dataurl
// --jsx-factory= 用來指定 jsx 編譯的函數，默認是 React.createElement(jsx esbuild 默認可打包)
import React from 'react'

React.createElement('div')
const name = 'esbuild'
const hello = (str) => console.log(`hello ${name}`)
hello(TEST)

export default hello
