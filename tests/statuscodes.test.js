const pw = require('playwright')

let browser
let context
let page

beforeAll(async () => {
  browser = await pw.webkit.launch() // 'chromium' | 'firefox' | 'webkit'
  context = await browser.newContext()
  page = await context.newPage()
})

beforeEach(async () => {
  await page.goto('https://the-internet.herokuapp.com')
  await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="/status_codes"]')
  ])
})

afterAll(async () => {
  await browser.close()
})

test('Page title is correct', async () => {
  const title = await page.title()
  expect(title).toBe('The Internet')
})

test('200 link returns status code 200', async () => {
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="status_codes/200"]')
  ])

  expect(response._status).toBe(200)
})

test('301 link returns status code 301', async () => {
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="status_codes/301"]')
  ])

  expect(response._status).toBe(301)
})

test('404 link returns status code 404', async () => {
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="status_codes/404"]')
  ])

  expect(response._status).toBe(404)
})

test('500 link returns status code 500', async () => {
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="status_codes/500"]')
  ])

  expect(response._status).toBe(500)
})

test('Footer text is correct', async () => {
  const footer = await page.$eval('#page-footer', div => div.textContent)
  expect(footer).toMatch(/Powered by Elemental Selenium/)
})

test('Footer link is correct', async () => {
  const link = await page.$eval('div[id="page-footer"] a', a => a.href)
  expect(link).toBe('http://elementalselenium.com/')
})
