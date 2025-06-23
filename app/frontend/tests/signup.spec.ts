import { chromium, expect, test } from "@playwright/test";

test.describe("Cadastro de usuário", () => {
  const baseUrl = "https://solidbank.local";

  test("TESTE DE CADASTRO", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    await page.goto(`${baseUrl}/signup`);

    await page.getByLabel("Nome completo").fill("Bruno Salles");
    await page.getByLabel("E-mail").fill(`bruno1@teste.com`);
    await page.getByLabel("CPF").fill("12345678901");
    await page.getByLabel("Telefone").fill("11987654321");
    await page.getByLabel("Senha", { exact: true }).fill("Senha@123");
    await page.getByLabel("Confirmar senha", { exact: true }).fill("Senha@123");

    await expect(page.getByText("Senha Forte")).toBeVisible();

    await page.getByRole("button", { name: "Criar Conta" }).click();

    await browser.close();
  });

  test("Erro ao deixar campos vazios", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    await page.goto(`${baseUrl}/signup`);
    await page.getByRole("button", { name: "Criar Conta" }).click();

    await browser.close();
  });

  test("Erro ao usar senha fraca", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    await page.goto(`${baseUrl}/signup`);

    await page.getByLabel("Nome completo").fill("Bruno");
    await page.getByLabel("E-mail").fill(`bruno1@teste.com`);
    await page.getByLabel("CPF").fill("12345678901");
    await page.getByLabel("Telefone").fill("11987654321");
    await page.getByLabel("Senha", { exact: true }).fill("123");
    await page.getByLabel("Confirmar senha", { exact: true }).fill("123");

    await page.getByRole("button", { name: "Criar Conta" }).click();
    await expect(page.getByText("A senha precisa ser forte.")).toBeVisible();

    await browser.close();
  });

  test("Erro ao usar email inválido", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    await page.goto(`${baseUrl}/signup`);

    await page.getByLabel("Nome completo").fill("Bruno");
    await page.getByLabel("E-mail").fill("bruno_email_invalido");
    await page.getByLabel("CPF").fill("12345678901");
    await page.getByLabel("Telefone").fill("11987654321");
    await page.getByLabel("Senha", { exact: true }).fill("123");
    await page.getByLabel("Confirmar senha", { exact: true }).fill("123");

    await page.getByRole("button", { name: "Criar Conta" }).click();

    await browser.close();
  });

  test("Erro se senhas não coincidirem", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    await page.goto(`${baseUrl}/signup`);

    await page.getByLabel("Nome completo").fill("Bruno");
    await page.getByLabel("E-mail").fill(`bruno1@teste.com`);
    await page.getByLabel("CPF").fill("12345678901");
    await page.getByLabel("Telefone").fill("11987654321");
    await page.getByLabel("Senha", { exact: true }).fill("Senha@123");
    await page
      .getByLabel("Confirmar senha", { exact: true })
      .fill("SenhaErrada@123");

    await page.getByRole("button", { name: "Criar Conta" }).click();
    await expect(page.getByText("As senhas não coincidem.")).toBeVisible();

    await browser.close();
  });
});
