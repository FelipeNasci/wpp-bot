import puppeteer from "puppeteer";

const URI = process.env.uri ?? "";
const user = {
  login: process.env.user ?? "",
  password: process.env.password ?? "",
};

const time = 2 * 1000;

const startBrowser = async (url) => {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();
  await page.goto(url);

  await page.setViewport({ width: 720, height: 1024 });

  return { page, browser };
};

const loginForm = async ({ user, password, page }) => {
  await page.waitForSelector("#login");

  await page.type("#login", user);
  await page.type("#senha", password);
  await page.click('input[type="submit"]');
};

const prepareDialogListener = async ({ page }) => {
  await page.on("dialog", async (dialog) => {
    await dialog.accept();
  });
};

const clickIntervalButton = async ({ page }) => {
  await prepareDialogListener({ page });
  await page.waitForSelector('button[type="submit"]');

  await page.click('button[value="SI"]');
  await page.waitForNavigation();
};

const clickButtonSubmit = async ({ page }) => {
  await prepareDialogListener({ page });
  await page.waitForSelector('button[type="submit"]');

  await page.click('button[type="submit"]');
  await page.waitForNavigation();
};

const handle = async (step = async () => {}) => {
  try {
    const { page, browser } = await startBrowser(URI);
    await loginForm({ user: user.login, password: user.password, page });

    await new Promise((r) => setTimeout(r, time));

    await step({ page });

    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

const flow = {
  login: async () => handle(),
  start: async () => handle(clickButtonSubmit),
  startInterval: async () => handle(clickIntervalButton),
  finishInterval: async () => handle(clickButtonSubmit),
  finish: async () => handle(clickButtonSubmit),
};

export { flow };
