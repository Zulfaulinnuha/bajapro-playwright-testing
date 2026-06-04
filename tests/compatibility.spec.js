const { test, expect } = require('@playwright/test');

// FS_COMP_001 - Co-existence dengan YouTube
test('FS_COMP_001 - Co-existence dengan YouTube', async ({ browser }) => {
    test.setTimeout(60000);

    const context = await browser.newContext();

    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await bajaproPage.waitForTimeout(5000);

    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' });
    await youtubePage.waitForTimeout(5000);

    await bajaproPage.bringToFront();
    await expect(bajaproPage).toHaveURL(/labai/);
    await bajaproPage.waitForTimeout(20000);
});

// FS_COMP_002 - Co-existence dengan WhatsApp Web
test('FS_COMP_002 - Co-existence dengan WhatsApp Web', async ({ browser }) => {
    test.setTimeout(60000);

    const context = await browser.newContext();

    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await bajaproPage.waitForTimeout(5000);

    const whatsappPage = await context.newPage();
    await whatsappPage.goto('https://web.whatsapp.com', { waitUntil: 'domcontentloaded' });
    await whatsappPage.waitForTimeout(5000);

    await bajaproPage.bringToFront();
    await expect(bajaproPage).toHaveURL(/labai/);
    await bajaproPage.waitForTimeout(20000);
});

// FS_COMP_003 - Navigasi Multi-Tab
test('FS_COMP_003 - Navigasi Multi-Tab', async ({ browser }) => {
    test.setTimeout(60000);

    const context = await browser.newContext();

    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await bajaproPage.waitForTimeout(3000);

    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' });
    await youtubePage.waitForTimeout(3000);

    const whatsappPage = await context.newPage();
    await whatsappPage.goto('https://web.whatsapp.com', { waitUntil: 'domcontentloaded' });
    await whatsappPage.waitForTimeout(3000);

    // pindah-pindah tab
    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(3000);
    await youtubePage.bringToFront();
    await youtubePage.waitForTimeout(3000);
    await whatsappPage.bringToFront();
    await whatsappPage.waitForTimeout(3000);
    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(3000);

    await expect(bajaproPage).toHaveURL(/labai/);
    await bajaproPage.waitForTimeout(15000);
});

// FS_COMP_004 - Fungsi Login saat Coexistence
test('FS_COMP_004 - Fungsi Login saat Coexistence', async ({ browser }) => {

    test.setTimeout(90000);

    const context = await browser.newContext();

    // TAB 1 → BAJAPRO LOGIN
    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    // isi email & password
    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');

    await bajaproPage.fill('input[name="password"]', 'testing12');

    // klik login dan tunggu redirect
    await Promise.all([
        bajaproPage.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }),
        bajaproPage.click('button[type="submit"]')
    ]);

    // TAB 2 → YouTube (Coexistence)
    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' });
    await youtubePage.waitForTimeout(5000);

    // kembali ke Bajapro
    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(3000);

    // VALIDASI LOGIN BERHASIL
    await expect(bajaproPage.getByRole('heading', { name: 'Java' })).toBeVisible({ timeout: 10000 });

    await bajaproPage.waitForTimeout(10000);
});

test('FS_COMP_005 - Akses My Course saat Coexistence', async ({ browser }) => {

    test.setTimeout(120000); // timeout lebih panjang untuk load materi

    const context = await browser.newContext();

    // TAB 1 → BAJAPRO LOGIN
    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    // login akun valid
    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');

    await bajaproPage.fill('input[name="password"]', 'testing12');

    // klik login dan tunggu redirect
    await Promise.all([
        bajaproPage.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }),
        bajaproPage.click('button[type="submit"]')
    ]);

    // TAB 2 → YouTube (Coexistence)
    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' });
    await youtubePage.waitForTimeout(5000);

    // kembali ke Bajapro
    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(3000);

    // BUKA MY COURSE
    await Promise.all([
        bajaproPage.waitForNavigation({ waitUntil: 'networkidle', timeout: 60000 }),
        bajaproPage.click('text=My Course') // ganti selector sesuai tombol/link My Course
    ]);

    // VALIDASI HALAMAN MY COURSE
    await expect(bajaproPage.locator('text=Take Your Lesson now')).toBeVisible({ timeout: 10000 });
    await expect(bajaproPage.getByRole('heading', { name: 'Java' })).toBeVisible({ timeout: 10000 });
    await bajaproPage.waitForTimeout(10000);
});

test('FS_COMP_006 - Akses materi saat coexistence', async ({ browser }) => {

    // timeout lebih panjang karena akses materi cukup berat
    test.setTimeout(120000);

    const context = await browser.newContext();

    // TAB 1 → BAJAPRO LOGIN
    const bajaproPage = await context.newPage();

    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    // login akun valid
    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');

    await bajaproPage.fill('input[name="password"]', 'testing12');

    // klik login + tunggu redirect
    await Promise.all([
        bajaproPage.waitForNavigation({
            waitUntil: 'networkidle',
            timeout: 60000
        }),

        bajaproPage.click('button[type="submit"]')
    ]);

    // TAB 2 → YOUTUBE
    const youtubePage = await context.newPage();

    await youtubePage.goto('https://www.youtube.com', {
        waitUntil: 'domcontentloaded'
    });
    await youtubePage.waitForTimeout(5000);

    // KEMBALI KE BAJAPRO
    await bajaproPage.bringToFront();

    await bajaproPage.waitForTimeout(3000);

    // BUKA MY COURSE
    await Promise.all([
        bajaproPage.waitForNavigation({
            waitUntil: 'networkidle',
            timeout: 60000
        }),

        bajaproPage.click('text=My Course')
    ]);

    // MASUK KE HALAMAN LEVEL
    await Promise.all([
        bajaproPage.waitForNavigation({
            waitUntil: 'networkidle',
            timeout: 60000
        }),

        bajaproPage.locator('text=Start Lesson').first().click()
    ]);

    // PILIH LEVEL EASY
    await bajaproPage
        .locator('text=Easy')
        .locator('..')
        .locator('text=Start Lesson')
        .first()
        .click({ force: true });

    // tunggu halaman detail materi load
    await bajaproPage.waitForLoadState('networkidle');

    // BUKA MATERI
    await bajaproPage
        .locator('text=Tipe Data, Variabel dan Operator')
        .first()
        .click();

    // VALIDASI MATERI
    await expect(
        bajaproPage.locator('iframe').first()
    ).toBeVisible({ timeout: 10000 });

    // teks materi tampil
    await expect(
        bajaproPage.getByText('Variabel', { exact: true }).first()
    ).toBeVisible({ timeout: 10000 });
    await bajaproPage.waitForTimeout(10000);

});

// FS_COMP_007 - Run code saat coexistence
// SEMI MANUAL TESTING
test('FS_COMP_007 - Run code saat coexistence', async ({ browser }) => {

    test.setTimeout(180000);

    const context = await browser.newContext();

    // TAB 1 → BAJAPRO
    const bajaproPage = await context.newPage();

    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded'
    });

    // login
    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');

    await bajaproPage.fill('input[name="password"]', 'testing12');

    await Promise.all([
        bajaproPage.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        bajaproPage.click('button[type="submit"]')
    ]);

    // BUKA MY COURSE
    await Promise.all([
        bajaproPage.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        bajaproPage.click('text=My Course')
    ]);

    // START LESSON
    await Promise.all([
        bajaproPage.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        bajaproPage.locator('text=Start Lesson').first().click()
    ]);

    // PILIH EASY
    await bajaproPage
        .locator('text=Easy')
        .locator('..')
        .locator('text=Start Lesson')
        .first()
        .click({ force: true });

    await bajaproPage.waitForLoadState('networkidle');

    // BUKA MATERI
    await bajaproPage
        .locator('text=Tipe Data, Variabel dan Operator')
        .first()
        .click();

    await expect(
        bajaproPage.getByText("Let's Test")
    ).toBeVisible();


    // TAB 2 → YOUTUBE
    const youtubePage = await context.newPage();

    await youtubePage.goto('https://www.youtube.com', {
        waitUntil: 'domcontentloaded'
    });

    await youtubePage.waitForTimeout(5000);

    // kembali ke Bajapro
    await bajaproPage.bringToFront();
    // KLIK LET'S TEST
    await bajaproPage.getByText("Let's Test").click();
    // TAHAN BROWSER
    // MANUAL RUN CODE
    await bajaproPage.waitForTimeout(60000);

});

// FS_COMP_008 - Submit saat coexistence
// SEMI MANUAL TESTING
test('FS_COMP_008 - Submit saat coexistence', async ({ browser }) => {

    test.setTimeout(180000);

    const context = await browser.newContext();

    // LOGIN
    const bajaproPage = await context.newPage();

    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded'
    });

    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');

    await bajaproPage.fill('input[name="password"]', 'testing12');

    await Promise.all([
        bajaproPage.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        bajaproPage.click('button[type="submit"]')
    ]);

    // MY COURSE
    await Promise.all([
        bajaproPage.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        bajaproPage.click('text=My Course')
    ]);

    // START LESSON
    await Promise.all([
        bajaproPage.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        bajaproPage.locator('text=Start Lesson').first().click()
    ]);

    // EASY
    await bajaproPage
        .locator('text=Easy')
        .locator('..')
        .locator('text=Start Lesson')
        .first()
        .click({ force: true });

    await bajaproPage.waitForLoadState('networkidle');

    // MATERI
    await bajaproPage
        .locator('text=Tipe Data, Variabel dan Operator')
        .first()
        .click();
    await bajaproPage.getByText("Let's Test").click();

    const youtubePage = await context.newPage();

    await youtubePage.goto('https://www.youtube.com', {
        waitUntil: 'domcontentloaded'
    });

    await youtubePage.waitForTimeout(5000);

    // kembali ke Bajapro
    await bajaproPage.bringToFront();
    // TAHAN BROWSER
    // MANUAL SUBMIT
    await bajaproPage.waitForTimeout(60000);

});

// FS_COMP_009 - Stabilitas aplikasi saat coexistence
test('FS_COMP_009 - Stabilitas aplikasi saat coexistence', async ({ browser }) => {

    test.setTimeout(300000); // 5 menit

    const context = await browser.newContext();
    const bajaproPage = await context.newPage();

    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded'
    });

    // login
    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');

    await bajaproPage.fill('input[name="password"]', 'testing12');

    await Promise.all([
        bajaproPage.waitForNavigation({
            waitUntil: 'networkidle'
        }),

        bajaproPage.click('button[type="submit"]')
    ]);

    // validasi dashboard tampil
    await expect(
        bajaproPage.getByRole('heading', { name: 'Java' })
    ).toBeVisible();
    const youtubePage = await context.newPage();

    await youtubePage.goto('https://www.youtube.com', {
        waitUntil: 'domcontentloaded'
    });

    const whatsappPage = await context.newPage();

    await whatsappPage.goto('https://web.whatsapp.com', {
        waitUntil: 'domcontentloaded'
    });

    // PINDAH-PINDAH TAB

    await youtubePage.bringToFront();
    await youtubePage.waitForTimeout(5000);

    await whatsappPage.bringToFront();
    await whatsappPage.waitForTimeout(5000);

    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(5000);

    // DIAMKAN 2 MENIT
    await bajaproPage.waitForTimeout(120000);

    // VALIDASI TETAP STABIL
    await expect(
        bajaproPage.getByRole('heading', { name: 'Java' })
    ).toBeVisible();

    // tahan browser untuk screenshot
    await bajaproPage.waitForTimeout(10000);

});