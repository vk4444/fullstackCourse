const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Test User',
        username: 'test_user',
        password: 'test_password'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const userField = await page.getByText('username')
    const passwordField = await page.getByText('password')
    const button = await page.getByText('login')

    expect(userField).toBeVisible()
    expect(passwordField).toBeVisible()
    expect(button).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.locator('input[name="Username"]').fill('test_user')
        await page.locator('input[name="Password"]').fill('test_password')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.locator('input[name="Username"]').fill('wrong')
        await page.locator('input[name="Password"]').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('wrong credentials')).toBeVisible()
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.locator('input[name="Username"]').fill('test_user')
            await page.locator('input[name="Password"]').fill('test_password')
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', {name: 'new note'}).click()

            await page.locator('input[name="Title"]').fill('Test Blog Title')
            await page.locator('input[name="Author"]').fill('Test Author')
            await page.locator('input[name="Url"]').fill('test.cz')

            await page.getByRole('button', {name: 'create'}).click()

            await expect(page.getByText('Test Blog Title Test Author')).toBeVisible()

        })

        describe('When blog created', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', {name: 'new note'}).click()

                await page.locator('input[name="Title"]').fill('Test Blog Title')
                await page.locator('input[name="Author"]').fill('Test Author')
                await page.locator('input[name="Url"]').fill('test.cz')

                await page.getByRole('button', {name: 'create'}).click()
            })

            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', {name: 'view'}).click()

                await page.getByRole('button', {name: 'like'}).click()
                await expect(page.getByText('1')).toBeVisible()

                await page.getByRole('button', {name: 'like'}).click()
                await expect(page.getByText('2')).toBeVisible()
            })

            test('a blog can be deleted', async ({ page }) => {
                await page.getByRole('button', {name: 'view'}).click()
                await page.getByRole('button', {name: 'delete'}).click()

                // tests using the url that is only visible in the details because a message from adding the blog might still be shown and it contains the title and author name
                await expect(page.getByText('test.cz')).not.toBeVisible()
            })

            

        })
    })
  }) 
})