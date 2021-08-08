// 讓 rollup 可以解析 json 檔
import json from '@rollup/plugin-json'
// 用來 build node_modules 的代碼到代碼中，沒使用的話則是外部引入，這樣開發者還要自行安裝插件才可使用
import resolve from '@rollup/plugin-node-resolve'
// rollup 默認支持 es module，也就是 import/export，但是 React 是 commonjs bundle，這樣 bundle 會解析失敗，所以該插件用來解析 commonjs
import commonjs from '@rollup/plugin-commonjs'
// 用來壓縮醜化代碼
import { terser } from 'rollup-plugin-terser'

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
    plugins: [resolve(), commonjs(), json()],
    // output 可以是 {} 也可以是 []
    output: [
      {
        file: `${output}/index.es.js`,
        format: 'es',
        // output 也可以加 plugins，會在代碼編譯完成時處理，所以通常插件會比較少，最常見的就是壓縮插件
        plugins: [terser()],
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
          'react': 'React'
        }
      }
    ]
  },
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
