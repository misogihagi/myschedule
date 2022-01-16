import { test, expect } from '@playwright/test'

test('create and list', async ({ page }) => {
  await page.goto('/')
  page.once('dialog', dialog => {
    dialog.accept('test')
    dialog.dismiss().catch(() => {});
  });
  await page.mouse.click(100,100);
  await new Promise(res=>{
    setTimeout(() => {
        res('')
    }, 5000);
  })
  const meeting =await page.locator('text=meeting')
  await expect(meeting).toHaveCount(1)

})
