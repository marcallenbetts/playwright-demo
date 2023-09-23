import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Page title is correct', async ({ page }) => {
  await expect(page).toHaveTitle('The Internet')
})

test('Page heading 1 text is correct', async ({ page }) => {
  const heading = await page.locator('h1').textContent()
  expect(heading).toBe('Welcome to the-internet')
})

test('Page heading 2 text is correct', async ({ page }) => {
  const heading = await page.locator('h2').textContent()
  expect(heading).toBe('Available Examples')
})

test('Footer text is correct', async ({ page }) => {
  const footer = await page.locator('#page-footer').textContent()
  expect(footer).toMatch(/Powered by Elemental Selenium/)
})

test('Footer link is correct', async ({ page }) => {
  const link = await page.locator('div#page-footer a').getAttribute('href')
  expect(link).toBe('http://elementalselenium.com/')
})
