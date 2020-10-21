import puppeteer from 'puppeteer'

export const RebootPuppeteer = async (ip, port, user, pass, rebootPage) => {
  let rebootResult

  const browser = await puppeteer.launch({
    args: [`--proxy-server=http://${ip}:${port}`],
    headless: false
  })


  const page = await browser.newPage()
  await page.authenticate({
    username: user,
    password: pass
  })
  await page.goto(`http://${rebootPage}/html/reboot.html`)

  await page.click('#reboot_apply_button'),
  await page.waitForSelector('#reboot_apply_button')
  await page.click('#pop_confirm'),
  await page.waitForTimeout(10000)

  await browser.close();


  return rebootResult
}