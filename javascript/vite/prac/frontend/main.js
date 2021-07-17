import "./style.css";

// 用 ?worker 標記為 webworker
import Worker from "./worker?worker";

// 接著 new Worker 實例 webworker
// 用 onmessage 與 postmessage 通信
// 簡單來說就是在頁面中多開一個線呈
// 當處理的內容過於頻繁且計算複雜就很適合這麼使用，因為js當線呈，放在同個js中處理，恐導致現有應用卡頓
const worker = new Worker();
worker.onmessage = (e) => {
  console.log(`onmessage: ${e.data}`);
};

export function render() {
  // 這個來自後端server(hello pug template)
  const {$mes} = window
  document.querySelector("#app").innerHTML = `
  <h1>Hello Vite!</h1>
  <h2>${$mes || 'node server 未啟動'}</h2>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation...</a>
`;
}

render();

// hmr-api 用來實現熱更新，原理是用socket通知
// 當你調用hot.accept將會關閉vite自動重整的功能
if (import.meta.hot) {
  // newModule 會取出新的模塊，該檔僅導出 render 故 newModule 內只有 render 這個模塊
  import.meta.hot.accept((newModule) => {
    worker.terminate()
    // 重新render達到熱更新
    newModule.render();
  });
}

// glob-import 批量導入功能，這裡導入 glob 目錄下的所有模塊
// 為vite功能而非es-module，由第三方庫fast-glob做的
// 編譯結果會把檔案取出使用異步加載導入
const globModules = import.meta.glob("./glob/*[a-c].(js|json)");

console.log('------------')
console.log('globModules')
console.log(globModules);

Object.entries(globModules).forEach(([k, v]) => {
  v().then((m) => {
    console.log(k)
    console.log(m.default)
  });
});


// globEager 會編譯成靜態資料在代碼中(同步)
const globEagerModules = import.meta.globEager("./glob/d.json");

console.log('------------')
console.log('globEagerModules')
console.log(globEagerModules)
console.log(globEagerModules['./glob/d.json'].default)
