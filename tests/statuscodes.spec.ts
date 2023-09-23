import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com')
  await page.getByRole('link', { name: 'Status Codes' }).click()
})

test('Page title is correct', async ({ page }) => {
  await expect(page).toHaveTitle('The Internet')
})

test('200 link returns status code 200', async ({ page }) => {
  const link = (await page
    .getByRole('link', { name: '200' })
    .getAttribute('href')) as string
  const response = await page.goto(link)

  expect(response?.status()).toBe(200)
})

test('301 link returns status code 301', async ({ page }) => {
  const link = (await page
    .getByRole('link', { name: '301' })
    .getAttribute('href')) as string
  const response = await page.goto(link)

  expect(response?.status()).toBe(301)
})

test('404 link returns status code 404', async ({ page }) => {
  const link = (await page
    .getByRole('link', { name: '404' })
    .getAttribute('href')) as string
  const response = await page.goto(link)

  expect(response?.status()).toBe(404)
})

test('500 link returns status code 500', async ({ page }) => {
  const link = (await page
    .getByRole('link', { name: '500' })
    .getAttribute('href')) as string
  const response = await page.goto(link)

  expect(response?.status()).toBe(500)
})

test('Footer text is correct', async ({ page }) => {
  const footer = await page.locator('#page-footer').textContent()
  expect(footer).toMatch(/Powered by Elemental Selenium/)
})

test('Footer link is correct', async ({ page }) => {
  const link = await page
    .getByRole('link', { name: 'Elemental Selenium' })
    .getAttribute('href')
  expect(link).toBe('http://elementalselenium.com/')
})
