const { test, expect, devices } = require('@playwright/test');

// HELPER LOGIN
async function login(page) {

    await page.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded'
    });

    await page.fill('input[name="email"]', 'testing@gmail.com');

    await page.fill('input[name="password"]', 'testing12');

    await Promise.all([
        page.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        page.click('button[type="submit"]')
    ]);

}

// FS_PORT_001 - Akses di Chromium
test('FS_PORT_001 - Akses di Chromium', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({ timeout: 10000 });

    await page.waitForTimeout(5000);

});

// FS_PORT_002 - Akses di Firefox
test('FS_PORT_002 - Akses di Firefox', async ({ page, browserName }) => {

    test.skip(browserName !== 'firefox');

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({ timeout: 10000 });

    await page.waitForTimeout(5000);

});

// FS_PORT_003 - Akses di WebKit
test('FS_PORT_003 - Akses di WebKit', async ({ page, browserName }) => {

    test.skip(browserName !== 'webkit');

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({ timeout: 10000 });

    await page.waitForTimeout(5000);

});

// FS_PORT_004 - Akses di Windows
test('FS_PORT_004 - Akses di Windows', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({ timeout: 10000 });

    await page.waitForTimeout(5000);

});

// FS_PORT_007 - Konsistensi Tampilan
test('FS_PORT_007 - Konsistensi Tampilan', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({ timeout: 10000 });

    await expect(
        page.locator('text=Take Your Lesson now')
    ).toBeVisible({ timeout: 10000 });

    await page.waitForTimeout(5000);

});

// FS_PORT_008 - Konsistensi Fitur Login
test('FS_PORT_008 - Konsistensi Fitur Login', async ({ page }) => {

    test.setTimeout(90000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({ timeout: 10000 });

    await page.waitForTimeout(5000);

});

// FS_PORT_009 - Konsistensi Fitur Course
test('FS_PORT_009 - Konsistensi Fitur Course', async ({ page }) => {

    test.setTimeout(120000);

    // login
    await login(page);

    // buka My Course
    await Promise.all([
        page.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        page.click('text=My Course')
    ]);

    // validasi halaman
    await expect(
        page.locator('text=Take Your Lesson now')
    ).toBeVisible({ timeout: 10000 });

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({ timeout: 10000 });

    await page.waitForTimeout(5000);

});

// FS_PORT_010 - Konsistensi Fitur Coding
// SEMI MANUAL TESTING
test('FS_PORT_010 - Konsistensi Fitur Coding', async ({ page }) => {

    test.setTimeout(180000);

    // login
    await login(page);

    // buka My Course
    await Promise.all([
        page.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        page.click('text=My Course')
    ]);

    // Start Lesson
    await Promise.all([
        page.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        page.locator('text=Start Lesson').first().click()
    ]);

    // pilih Easy
    await page
        .locator('text=Easy')
        .locator('..')
        .locator('text=Start Lesson')
        .first()
        .click({ force: true });

    await page.waitForLoadState('networkidle');

    // buka materi
    await page
        .locator('text=Tipe Data, Variabel dan Operator')
        .first()
        .click();

    // validasi tombol Let's Test
    await expect(
        page.getByText("Let's Test")
    ).toBeVisible({ timeout: 10000 });

    // buka coding
    await page.getByText("Let's Test").click();

    // tahan browser untuk manual testing
    await page.waitForTimeout(60000);

});