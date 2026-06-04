const { test, expect, devices } = require('@playwright/test');

test.use({
    ...devices['Pixel 5']
});

async function login(page) {

    await page.goto('http://labai.polinema.ac.id:90/login');

    await page.fill('input[name="email"]', 'testing@gmail.com');

    await page.fill('input[name="password"]', 'testing12');

    await Promise.all([
        page.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        page.click('button[type="submit"]')
    ]);
}

test('FS_PORT_005 - Akses di Android', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({ timeout: 10000 });

    await page.screenshot({
        path: 'android-portability.png',
        fullPage: true
    });

    await page.waitForTimeout(5000);

});