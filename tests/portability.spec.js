const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://labai.polinema.ac.id:90';

// ======================================
// HELPER LOGIN
// ======================================
async function login(page) {

    await page.goto(`${BASE_URL}/login`, {
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

// ======================================
// FS_PORT_001
// Akses di Chromium
// ======================================

test('FS_PORT_001 - Akses di Chromium', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({
        timeout: 10000
    });

    await page.waitForTimeout(5000);

});

// ======================================
// FS_PORT_002
// Akses di Firefox
// ======================================

test('FS_PORT_002 - Akses di Firefox', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({
        timeout: 10000
    });

    await page.waitForTimeout(5000);

});

// ======================================
// FS_PORT_003
// Akses di WebKit
// ======================================

test('FS_PORT_003 - Akses di WebKit', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({
        timeout: 10000
    });

    await page.waitForTimeout(5000);

});

// ======================================
// FS_PORT_004
// Akses di Windows
// ======================================

test('FS_PORT_004 - Akses di Windows', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({
        timeout: 10000
    });

    await page.waitForTimeout(5000);

});

// ======================================
// FS_PORT_005
// Akses di Android
// ======================================

test('FS_PORT_005 - Akses di Android', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({
        timeout: 10000
    });

    await page.screenshot({
        path: 'android-portability.png',
        fullPage: true
    });

    await page.waitForTimeout(5000);

});

// ======================================
// FS_PORT_006
// Akses di iOS
// ======================================

test('FS_PORT_006 - Akses di iOS', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({
        timeout: 10000
    });

    await page.screenshot({
        path: 'ios-portability.png',
        fullPage: true
    });

    await page.waitForTimeout(5000);

});


// ======================================
// FS_PORT_007
// Konsistensi Tampilan
// ======================================

test('FS_PORT_007 - Konsistensi Tampilan', async ({ page }) => {

    test.setTimeout(60000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({
        timeout: 10000
    });

    await expect(
        page.locator('text=Take Your Lesson now')
    ).toBeVisible({
        timeout: 10000
    });

    await page.waitForTimeout(5000);

});

// ======================================
// FS_PORT_008
// Konsistensi Fitur Login
// ======================================

test('FS_PORT_008 - Konsistensi Fitur Login', async ({ page }) => {

    test.setTimeout(90000);

    await login(page);

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({
        timeout: 10000
    });

    await page.waitForTimeout(5000);

});

// ======================================
// FS_PORT_009
// Konsistensi Fitur Course
// ======================================

test('FS_PORT_009 - Konsistensi Fitur Course', async ({ page }) => {

    test.setTimeout(120000);

    // Login
    await login(page);

    // Buka My Course
    await Promise.all([
        page.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        page.click('text=My Course')
    ]);

    // Validasi halaman
    await expect(
        page.locator('text=Take Your Lesson now')
    ).toBeVisible({
        timeout: 10000
    });

    await expect(
        page.locator('text=Java').first()
    ).toBeVisible({
        timeout: 10000
    });

    await page.waitForTimeout(5000);

});

// ======================================
// FS_PORT_010
// Konsistensi Fitur Coding
// Semi Manual Testing
// ======================================

test('FS_PORT_010 - Konsistensi Fitur Coding', async ({ page }) => {

    test.setTimeout(180000);

    // Login
    await login(page);

    // Buka My Course
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

    // Pilih level Easy
    await page
        .locator('text=Easy')
        .locator('..')
        .locator('text=Start Lesson')
        .first()
        .click({ force: true });

    // Tunggu halaman selesai dimuat
    await page.waitForLoadState('networkidle');

    // Buka materi
    await page
        .locator('text=Tipe Data, Variabel dan Operator')
        .first()
        .click();

    // Validasi tombol Let's Test
    await expect(
        page.getByText("Let's Test")
    ).toBeVisible({
        timeout: 10000
    });

    // Masuk ke editor coding
    await page.getByText("Let's Test").click();

    // Semi Manual Testing
    await page.waitForTimeout(60000);

});