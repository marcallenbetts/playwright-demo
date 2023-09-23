import { test, expect } from '@playwright/test'

let page

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.getByText('Form Authentication').click()
})

test('Page title is correct', async ({ page }) => {
  await expect(page).toHaveTitle('The Internet')
})

test('Heading has correct text', async ({ page }) => {
  const heading = await page.locator('h2').textContent()
  expect(heading).toBe('Login Page')
})

test('Blank username and password displays error message', async ({ page }) => {
  await page.getByRole('button', { name: /Login/ }).click()
  const message = await page.locator('#flash').textContent()

  expect(message).toMatch(/Your username is invalid!/)
})

test('Login', async ({ page }) => {
  await page.locator('#username').fill('tomsmith')
  await page.locator('#password').fill('SuperSecretPassword!')
  await page.getByRole('button', { name: /Login/ }).click()
  const message = await page.locator('#flash').textContent()

  expect(message).toMatch(/You logged into a secure area!/)
})

test('Invalid password', async ({ page }) => {
  await page.locator('#username').fill('tomsmith')
  await page.locator('#password').fill('SuperSecretPassword')
  await page.getByRole('button', { name: /Login/ }).click()
  const message = await page.locator('#flash').textContent()

  expect(message).toMatch(/Your password is invalid!/)
})

test('Footer text is correct', async ({ page }) => {
  const footer = await page.locator('#page-footer').textContent()
  expect(footer).toMatch(/Powered by Elemental Selenium/)
})

test('Footer link is correct', async ({ page }) => {
  const link = await page.getByRole('link', { name: 'Elemental Selenium' })
  expect(await link.getAttribute('href')).toEqual(
    'http://elementalselenium.com/'
  )
})
