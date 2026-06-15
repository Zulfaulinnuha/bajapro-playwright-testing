const { test, expect } = require('@playwright/test');

// FS_COMP_001 - Co-existence dengan YouTube
test('FS_COMP_001 - Co-existence dengan YouTube', async ({ browser }) => {
    test.setTimeout(90000); // Dinaikkan ke 90 detik karena memuat YouTube cukup berat

    const context = await browser.newContext();

    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await bajaproPage.waitForTimeout(2000); // Dikurangi dari 5000ms ke 2000ms

    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await youtubePage.waitForTimeout(2000);

    await bajaproPage.bringToFront();
    await expect(bajaproPage).toHaveURL(/labai/);
    await bajaproPage.waitForTimeout(5000); // Dikurangi dari 20000ms untuk menghemat waktu tes
});

// FS_COMP_002 - Co-existence dengan WhatsApp Web
test('FS_COMP_002 - Co-existence dengan WhatsApp Web', async ({ browser }) => {
    test.setTimeout(90000); // Dinaikkan ke 90 detik

    const context = await browser.newContext();

    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await bajaproPage.waitForTimeout(2000);

    const whatsappPage = await context.newPage();
    await whatsappPage.goto('https://web.whatsapp.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await whatsappPage.waitForTimeout(2000);

    await bajaproPage.bringToFront();
    await expect(bajaproPage).toHaveURL(/labai/);
    await bajaproPage.waitForTimeout(5000);
});

// FS_COMP_003 - Navigasi Multi-Tab
test('FS_COMP_003 - Navigasi Multi-Tab', async ({ browser }) => {
    test.setTimeout(120000); // Dinaikkan ke 120 detik karena memuat YouTube + WhatsApp sekaligus

    const context = await browser.newContext();

    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await bajaproPage.waitForTimeout(2000);

    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await youtubePage.waitForTimeout(2000);

    const whatsappPage = await context.newPage();
    await whatsappPage.goto('https://web.whatsapp.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await whatsappPage.waitForTimeout(2000);

    // Pindah-pindah tab dengan waktu tunggu lebih singkat
    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(1000);
    await youtubePage.bringToFront();
    await youtubePage.waitForTimeout(1000);
    await whatsappPage.bringToFront();
    await whatsappPage.waitForTimeout(1000);
    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(1000);

    await expect(bajaproPage).toHaveURL(/labai/);
    await bajaproPage.waitForTimeout(5000);
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

    // Isi email & password
    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');
    await bajaproPage.fill('input[name="password"]', 'testing12');

    // Klik login langsung (Playwright akan melakukan navigasi secara background)
    await bajaproPage.click('button[type="submit"]');

    // TAB 2 → YouTube (Coexistence)
    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await youtubePage.waitForTimeout(2000);

    // Kembali ke Bajapro
    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(2000);

    // VALIDASI LOGIN BERHASIL (Menggunakan auto-waiting dari expect)
    await expect(bajaproPage.getByRole('heading', { name: 'Java' })).toBeVisible({ timeout: 20000 });
    await bajaproPage.waitForTimeout(5000);
});

// FS_COMP_005 - Akses My Course saat Coexistence
test('FS_COMP_005 - Akses My Course saat Coexistence', async ({ browser }) => {
    test.setTimeout(120000);

    const context = await browser.newContext();

    // TAB 1 → BAJAPRO LOGIN
    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    // Login akun valid
    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');
    await bajaproPage.fill('input[name="password"]', 'testing12');
    
    // Klik login dan tunggu dashboard termuat
    await bajaproPage.click('button[type="submit"]');
    await expect(bajaproPage.getByRole('heading', { name: 'Java' })).toBeVisible({ timeout: 20000 });

    // TAB 2 → YouTube (Coexistence)
    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await youtubePage.waitForTimeout(3000);

    // Kembali ke Bajapro
    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(2000);

    // BUKA MY COURSE
    await bajaproPage.click('text=My Course');

    // VALIDASI HALAMAN MY COURSE (Auto-waiting mendeteksi teks ini muncul di halaman baru)
    await expect(bajaproPage.locator('text=Take Your Lesson now')).toBeVisible({ timeout: 20000 });
    await expect(bajaproPage.getByRole('heading', { name: 'Java' })).toBeVisible({ timeout: 20000 });
    await bajaproPage.waitForTimeout(5000);
});

// FS_COMP_006 - Akses materi saat coexistence
test('FS_COMP_006 - Akses materi saat coexistence', async ({ browser }) => {
    test.setTimeout(150000); // Lebih panjang karena materi cukup berat

    const context = await browser.newContext();

    // TAB 1 → BAJAPRO LOGIN
    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    // Login
    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');
    await bajaproPage.fill('input[name="password"]', 'testing12');
    await bajaproPage.click('button[type="submit"]');
    await expect(bajaproPage.getByRole('heading', { name: 'Java' })).toBeVisible({ timeout: 20000 });

    // TAB 2 → YOUTUBE
    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await youtubePage.waitForTimeout(3000);

    // KEMBALI KE BAJAPRO
    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(2000);

    // BUKA MY COURSE
    await bajaproPage.click('text=My Course');
    await expect(bajaproPage.locator('text=Take Your Lesson now')).toBeVisible({ timeout: 20000 });

    // MASUK KE HALAMAN LEVEL
    await bajaproPage.locator('text=Start Lesson').first().click();

    // PILIH LEVEL EASY
    await bajaproPage
        .locator('text=Easy')
        .locator('..')
        .locator('text=Start Lesson')
        .first()
        .click({ force: true });

    // Tunggu halaman detail materi load
    await bajaproPage.waitForLoadState('domcontentloaded');

    // BUKA MATERI
    await bajaproPage
        .locator('text=Tipe Data, Variabel dan Operator')
        .first()
        .click();

    // VALIDASI MATERI
    await expect(bajaproPage.locator('iframe').first()).toBeVisible({ timeout: 20000 });
    await expect(bajaproPage.getByText('Variabel', { exact: true }).first()).toBeVisible({ timeout: 20000 });
    await bajaproPage.waitForTimeout(5000);
});

// FS_COMP_007 - Run code saat coexistence (SEMI MANUAL TESTING)
test('FS_COMP_007 - Run code saat coexistence', async ({ browser }) => {
    test.setTimeout(180000);

    const context = await browser.newContext();

    // TAB 1 → BAJAPRO
    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    // Login
    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');
    await bajaproPage.fill('input[name="password"]', 'testing12');
    await bajaproPage.click('button[type="submit"]');
    await expect(bajaproPage.getByRole('heading', { name: 'Java' })).toBeVisible({ timeout: 20000 });

    // BUKA MY COURSE
    await bajaproPage.click('text=My Course');
    await expect(bajaproPage.locator('text=Take Your Lesson now')).toBeVisible({ timeout: 20000 });

    // START LESSON
    await bajaproPage.locator('text=Start Lesson').first().click();

    // PILIH EASY
    await bajaproPage
        .locator('text=Easy')
        .locator('..')
        .locator('text=Start Lesson')
        .first()
        .click({ force: true });

    await bajaproPage.waitForLoadState('domcontentloaded');

    // BUKA MATERI
    await bajaproPage
        .locator('text=Tipe Data, Variabel dan Operator')
        .first()
        .click();

    await expect(bajaproPage.getByText("Let's Test")).toBeVisible({ timeout: 20000 });

    // TAB 2 → YOUTUBE
    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await youtubePage.waitForTimeout(3000);

    // Kembali ke Bajapro
    await bajaproPage.bringToFront();
    
    // KLIK LET'S TEST
    await bajaproPage.getByText("Let's Test").click();
    
    // TAHAN BROWSER - MANUAL RUN CODE
    await bajaproPage.waitForTimeout(60000);
});

// FS_COMP_008 - Submit saat coexistence (SEMI MANUAL TESTING)
test('FS_COMP_008 - Submit saat coexistence', async ({ browser }) => {
    test.setTimeout(180000);

    const context = await browser.newContext();

    // LOGIN
    const bajaproPage = await context.newPage();
    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');
    await bajaproPage.fill('input[name="password"]', 'testing12');
    await bajaproPage.click('button[type="submit"]');
    await expect(bajaproPage.getByRole('heading', { name: 'Java' })).toBeVisible({ timeout: 20000 });

    // MY COURSE
    await bajaproPage.click('text=My Course');
    await expect(bajaproPage.locator('text=Take Your Lesson now')).toBeVisible({ timeout: 20000 });

    // START LESSON
    await bajaproPage.locator('text=Start Lesson').first().click();

    // EASY
    await bajaproPage
        .locator('text=Easy')
        .locator('..')
        .locator('text=Start Lesson')
        .first()
        .click({ force: true });

    await bajaproPage.waitForLoadState('domcontentloaded');

    // MATERI
    await bajaproPage
        .locator('text=Tipe Data, Variabel dan Operator')
        .first()
        .click();
        
    await bajaproPage.getByText("Let's Test").click();

    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await youtubePage.waitForTimeout(3000);

    // Kembali ke Bajapro
    await bajaproPage.bringToFront();
    
    // TAHAN BROWSER - MANUAL SUBMIT
    await bajaproPage.waitForTimeout(60000);
});

// FS_COMP_009 - Stabilitas aplikasi saat coexistence
test('FS_COMP_009 - Stabilitas aplikasi saat coexistence', async ({ browser }) => {
    test.setTimeout(300000); // 5 menit

    const context = await browser.newContext();
    const bajaproPage = await context.newPage();

    await bajaproPage.goto('http://labai.polinema.ac.id:90/login', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    // Login
    await bajaproPage.fill('input[name="email"]', 'testing@gmail.com');
    await bajaproPage.fill('input[name="password"]', 'testing12');
    await bajaproPage.click('button[type="submit"]');

    // Validasi dashboard tampil
    await expect(bajaproPage.getByRole('heading', { name: 'Java' })).toBeVisible({ timeout: 20000 });

    const youtubePage = await context.newPage();
    await youtubePage.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded', timeout: 60000 });

    const whatsappPage = await context.newPage();
    await whatsappPage.goto('https://web.whatsapp.com', { waitUntil: 'domcontentloaded', timeout: 60000 });

    // PINDAH-PINDAH TAB
    await youtubePage.bringToFront();
    await youtubePage.waitForTimeout(2000);

    await whatsappPage.bringToFront();
    await whatsappPage.waitForTimeout(2000);

    await bajaproPage.bringToFront();
    await bajaproPage.waitForTimeout(2000);

    // DIAMKAN 2 MENIT
    await bajaproPage.waitForTimeout(120000);

    // VALIDASI TETAP STABIL
    await expect(bajaproPage.getByRole('heading', { name: 'Java' })).toBeVisible({ timeout: 20000 });

    // Tahan sebentar untuk screenshot
    await bajaproPage.waitForTimeout(5000);
});