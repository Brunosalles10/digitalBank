import { chromium, test } from "@playwright/test";

test.describe("Fluxo de Login", () => {
  test("Login com sucesso", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    await page.goto("https://solidbank.local/login");

    await page.getByLabel("E-mail").fill("bruno1@teste.com");
    await page.getByLabel("Senha").fill("Senha@123");

    await page.getByRole("button", { name: "Entrar" }).click();

    await browser.close();
  });

  test("Erro ao tentar logar com campos vazios", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    await page.goto("https://solidbank.local/login");

    await page.getByRole("button", { name: "Entrar" }).click();

    await browser.close();
  });

  test("Erro ao usar credenciais inválidas", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    await page.goto("https://solidbank.local/login");

    await page.getByLabel("E-mail").fill("naoexiste@email.com");
    await page.getByLabel("Senha").fill("SenhaErrada123");

    await page.getByRole("button", { name: "Entrar" }).click();

    await browser.close();
  });
});
