/**
 如果使用 command line rollup 的話抓的是 global rollup，package scripts 則是 package packages 的 rollup，或者是用 ./node_modules/.bin/rollup 來執行
**/

// 常用基本指令
// -v, --version 查版本
// -h, --help 查幫助文檔
// -i, --input 輸入文件(可以多個，如：-i a.js -i b.js --dir dist)
// -o, --file 輸出文件
// -f, --format 編譯格式，如：cjs, umd...
// -d, --dir 輸出目錄(多文件輸入常用，使用 --dir 導出到對應目錄)
// -n, --name 指定 umd 的名字
// -w, --watch 監聽文件變化
// -c, --config 指定執行的 rollup.config.js
// --environment [key]:[value] 指定環境變量
// -p, --plugin json

// 讓 rollup 可以解析 json 檔
import json from '@rollup/plugin-json'
// 用來 build node_modules 的代碼到代碼中，沒使用的話則是外部引入，這樣開發者還要自行安裝插件才可使用
import resolve from '@rollup/plugin-node-resolve'
// rollup 默認支持 es module，也就是 import/export，但是 React 是 commonjs bundle，這樣 bundle 會解析失敗，所以該插件用來解析 commonjs
import commonjs from '@rollup/plugin-commonjs'
// 用來壓縮醜化代碼
import { terser } from 'rollup-plugin-terser'
// 就 alias
import alias from '@rollup/plugin-alias'
// 取代文字用
import replace from '@rollup/plugin-replace'
// 該插件需要依賴 tslib, typescript，用來編譯 ts，不過 babel 內已經內置 typescript 編譯，所以看你需求使用，差別在 babel 不會進行類型較驗純編譯，而該插件會，因為是直接調用 typescript 包的功能，該插件也會吃到 ts.config
// 也有一個第三方的 rollup-plugin-typescript2 插件，用法跟官方一致，差別在於該插件會輸出 typescript 錯誤的訊息(由官方插件封裝而成，所以功能比官方還多，像 vue3 使用的就是該插件)
import ts from '@rollup/plugin-typescript'
// eslint 較驗插件，詳細察看下方註解
import eslint from '@rollup/plugin-eslint'
// 編譯 image 用插件，圖片為二禁制資料，rollup 本身不處理，打包時會報錯
import image from '@rollup/plugin-image'
// 移除 console.log 的語法，僅在 console.log 裡使用的變量也會一同剃除(函數內的 console.log 仍會存在，但全局的會被剃除)
// 按需求使用，也可以在 eslint 裡配置是否能 console，這樣就能手動去控制是法要保存 console
import strip from '@rollup/plugin-strip'
// 加載 wasm 用，此不演示
import wasm from '@rollup/plugin-wasm'
// 就 babel
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'

const entry = 'src/index.js'
const output = 'dist'

// export default 可以是 {} 也可以是 []
// 這種可 {} 可 [] 的我一律建議使用 [] 來寫，以防日後擴充又多一個活
export default [
  {
    input: entry,
    // 用來過濾 resolve 的打包代碼，可以決定哪些包要打成代碼；哪些不要
    external: ['react'],
    // 比較特別的可以使用物件來定義引入名字
    // external: {
    //   'react': 'React',
    // },
    // resolve 建議放在最前面，否則外部資源有使用到 json 依然會外部引入
    // rollup plugins 是按照放置位置照順序執行的
    // 基本上 resolve, commonjs 都是會用到的，所以用 external 來考慮
    plugins: [
      resolve(),
      alias({
        entries: {
          asdasd: './a.json'
        }
      }),
      replace({
        __TEST__: 123
      }),
      // 基本上無順序要求，如果裝了這插件，只要寫不規範就報錯
      // eslint({
        // eslint 默認報錯仍會編譯通過，加上該配置將會阻擋編譯
        // throwOnError: true
      // }),
      commonjs(),
      // 調用 babel 插件
      // babel(),
      image(),
      strip(),
      ts(),
      json()
    ],
    // output 可以是 {} 也可以是 []
    output: [
      {
        file: `${output}/index.es.js`,
        format: 'es',
        // output 也可以加 plugins，會在代碼編譯完成時處理，所以通常插件會比較少，最常見的就是壓縮插件
        plugins: [
          // 調用 babel 轉 es5 函數
          getBabelOutputPlugin({
            presets: ['@babel/preset-env']
          }),
          terser()
        ],
        // 會在打包後的代碼最上方加入，可以用來宣傳作者心路歷程、代碼怎麼使用R等等，不過使用 terser 醜化代碼後，將不會出現
        banner: '/** Hello this is banner. **/'
      },
      {
        file: `${output}/index.umd.js`,
        format: 'umd',
        name: 'Index',
        plugins: [terser()],
        // 用來定義 global variable name，因為 react 被 external 了
        globals: {
          react: 'React'
        }
      }
    ]
  }
  // {
  //   input: 'src/index.js',
  //   plugins: [resolve(), commonjs(), json()],
  //   output: {
  //     file: 'dist/index.umd.js',
  //     format: 'umd',
  //     name: 'Index'
  //   }
  // }
]
