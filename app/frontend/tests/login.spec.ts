import { test } from "@playwright/test";

const baseUrl = "http://localhost:5173";

test.describe("Fluxo de Login", () => {
  test("Login com sucesso", async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.getByLabel("E-mail").fill("bruno1@teste.com");
    await page.getByLabel("Senha").fill("Senha@123");

    await page.getByRole("button", { name: "Entrar" }).click();
  });

  test("Erro ao tentar logar com campos vazios", async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.getByRole("button", { name: "Entrar" }).click();
  });

  test("Erro ao usar credenciais inválidas", async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.getByLabel("E-mail").fill("naoexiste@email.com");
    await page.getByLabel("Senha").fill("SenhaErrada123");

    await page.getByRole("button", { name: "Entrar" }).click();
  });
});
