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
  await Promise.all([page.waitForNavigation(), page.click('a[href="/login"]')])
  await page.screenshot({ path: './screenshots/login.png' })
})

afterAll(async () => {
  await browser.close()
})

test('Page title is correct', async () => {
  const title = await page.title()
  expect(title).toBe('The Internet')
})

test('Heading has correct text', async () => {
  const heading = await page.$eval('h2', h2 => h2.textContent)
  expect(heading).toBe('Login Page')
})

test('Blank username and password displays error message', async () => {
  await Promise.all([page.waitForNavigation(), page.click('button')])

  const message = await page.$eval('#flash', div => div.textContent)

  expect(message).toMatch(/Your username is invalid!/)
})

test('Login', async () => {
  await page.type('#username', 'tomsmith')
  await page.type('#password', 'SuperSecretPassword!')
  await Promise.all([page.waitForNavigation(), page.click('button')])

  const message = await page.$eval('#flash', div => div.textContent)

  expect(message).toMatch(/You logged into a secure area!/)
})

test('Footer text is correct', async () => {
  const footer = await page.$eval('#page-footer', div => div.textContent)
  expect(footer).toMatch(/Powered by Elemental Selenium/)
})

test('Footer link is correct', async () => {
  const link = await page.$eval('div[id="page-footer"] a', a => a.href)
  expect(link).toBe('http://elementalselenium.com/')
})
