const prompts = require('prompts')
const fs = require('fs')
const path = require('path')
const translate = require('./cn-translate')
const {_SOURCE_ROOT_PATH, _FILE_EXTENSION, _PENDING_TIME} = process.env
let waitEndTimer = null

const waitStart = () => {
  if (!_PENDING_TIME && _PENDING_TIME.trim() === '') {
    throw '_PENDING_TIME 別亂動，要動請改毫米數好嗎'
  }
  waitEndTimer = setTimeout(() => {
    console.log('timeout...')
  }, Number(_PENDING_TIME))
}

const checkEnd = ref => {
  clearTimeout(waitEndTimer)
  if (ref.c !== ref.e) {
    return waitStart()
  }
  return console.log(`編譯完成，共翻譯${ref.c}隻檔案`)
}

const recfind = (ref, _path, _mode) => {
  fs.readdir(_path, (err, files) => {
    if (err) return console.log(`readdir error ${_path}`)
    if (files.length) {
      files.forEach(e => {
        const next = `${_path}/${e}`
        fs.lstat(next, (err, stats) => {
          if (err) return console.log(`fs.lstat error ${next}`)
          if (stats.isDirectory()) {
            recfind(ref, next, _mode)
          } else {
            const ext = path.extname(e)
            if (ext === _FILE_EXTENSION) {
              fs.readFile(next, (err, f) => {
                if (err) return console.log(`讀檔異常，路徑：${next}`)
                ref.e++
                const str = f.toString()
                const after = translate[_mode](str)
                fs.writeFile(next, after, (err) => {
                  if (err) return console.log(`寫檔異常，路徑：${next}`)
                  ref.c++
                  console.log(`${next} 翻譯完成`)
                  checkEnd(ref)
                })
              })
            }
          }
        })
      })
    }
  })
}

;(async () => {
  const ref = { c: 0, e: 0 }
  const { p, m } = await prompts([
    {
      type: 'text',
      name: 'p',
      message: `請填寫預編譯的目錄跟路徑，預設為=${_SOURCE_ROOT_PATH}，可由 package.json 該改，環境變量名稱為：_SOURCE_ROOT_PATH`,
    },
    {
      type: 'select',
      name: 'm',
      message: '請選擇翻譯的模式',
      choices: [
        { title: '繁轉簡', value: 'toSimple' },
        { title: '簡轉繁', value: 'toTraditional' },
      ],
    }
  ])
  const SOURCE_ROOT_PATH = p || _SOURCE_ROOT_PATH

  if (!_SOURCE_ROOT_PATH && _SOURCE_ROOT_PATH.trim() === '') {
    throw '爆炸了，我嚴重懷疑是你的路徑錯誤，請確認'
  }
  waitStart()
  recfind(ref, SOURCE_ROOT_PATH, m)
})()
