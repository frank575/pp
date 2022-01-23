const puppeteer = require('puppeteer')
const app = require('express')()

const config = {
  puppeteer: {
    headless: false
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

  const [minePage, loginPage] = await Promise.all([
    createGoToPage(browser, 'mh/#/mine'),
    createGoToPage(browser, 'mh/#/login')
  ])
  await loginPage.waitForSelector('#form_username')
  await loginPage.type('#form_username', 'admin')
  await loginPage.type('#form_password', '123456')
  await loginPage.click('button[type=submit]')
  await loginPage.waitForNavigation()
  await loginPage.close()

  await waitWithMs(1000)
  await minePage.reload()
})()
