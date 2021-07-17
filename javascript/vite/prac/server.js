const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.use(express.static('dist'))

app.get('/', (req, res) => {
  // 引入 vite build dist 的 manifest.json
  const manifest = require('./dist/manifest.json')

  res.render('index', {
    title: 'hey',
    message: 'hello pug template',
    // 把對應的路徑寫入
    index: manifest['index.html'].file,
    css: manifest['index.html'].css[0]
  })
})

app.listen(3000)

console.log('http://localhost:3000/')
