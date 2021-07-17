import {defineConfig} from 'vite'

export default defineConfig({
  build: {
    // 編譯會附上 manifest.json
    manifest: true,
    outDir: '../dist'
  }
})
