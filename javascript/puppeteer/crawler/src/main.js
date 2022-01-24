const path = require('path')
const puppeteer = require('puppeteer')

const isPkg = typeof process.pkg !== 'undefined';

//mac path replace
let chromiumExecutablePath = (isPkg ?
    puppeteer.executablePath().replace(
      /^.*?\/node_modules\/puppeteer\/\.local-chromium/,
      path.join(path.dirname(process.execPath), 'chromium')
    ) :
    puppeteer.executablePath()
);

console.log(process.platform)
//check win32
if (process.platform == 'win32') {
  chromiumExecutablePath = (isPkg ?
      puppeteer.executablePath().replace(
        /^.*?\\node_modules\\puppeteer\\\.local-chromium/,
        path.join(path.dirname(process.execPath), 'chromium')
      ) :
      puppeteer.executablePath()
  );
}

const config = {
  pageDomain: 'http://test-mh.tc-tech.tw',
  port: 7777,
  puppeteer: {
    executablePath: chromiumExecutablePath,
    headless: true
  }
}

const waitWithMs = (ms = 0) => new Promise(async resolve => {
  setTimeout(() => { resolve() }, ms)
})

const createGoToPage = async (browser, url) => {
    const page = await browser.newPage()
    await page.goto(url)
    return page
  }

;(async () => {
  const browser = await puppeteer.launch({
    ...config.puppeteer
  })

  console.log('頁面開啟，開始登入...')

  const loginPage = await createGoToPage(browser, `${config.pageDomain}/#/login`)
  await loginPage.waitForSelector('#form_username')
  await loginPage.type('#form_username', 'admin')
  await loginPage.type('#form_password', '123456')
  await loginPage.click('button[type=submit]')
  // await loginPage.waitForResponse(async res => {
  //   const url = res.url()
  //   if (url.indexOf('/api/login') !== -1) {
  //     const json = await res.json()
  //     if (res.status() === 200) {
  //       return res.ok()
  //     }
  //   }
  // })
  await loginPage.waitForNavigation()

  console.log('登入完成並關閉登入頁')
  console.log('開始創建服務器')

  const app = require('express')()
  app.get('/username', async (req, res) => {
    const minePage = await createGoToPage(browser, `${config.pageDomain}/#/mine`)
    const blockSelectorClassName = 'div.flex.items-center.justify-between.px-4.py-2.bg-gray-100.rounded'
    await minePage.waitForSelector(blockSelectorClassName)
    await waitWithMs(500)
    const username = await minePage.evaluate(({ blockSelectorClassName }) => {
      return document.querySelector(`${blockSelectorClassName} > div > div`)?.textContent || null
    }, { blockSelectorClassName })
    await minePage.close()
    res.json({
      success: true,
      message: '取得使用者名稱成功',
      data: username,
    })
  })

  app.listen(config.port, () => {
    console.log('服務建立完成，請查看服務路徑：')
    console.log(`http://localhost:${config.port}`)
  })
})()
