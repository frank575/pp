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

document.querySelector("#app").innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
