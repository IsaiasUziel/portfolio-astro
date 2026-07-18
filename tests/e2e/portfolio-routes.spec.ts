import { expect, test } from "@playwright/test";

test.describe("portfolio bilingual routes and CTAs", () => {
  test("root serves spanish default experience (no selector landing)", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(
      page.locator('nav[aria-label="Navegación principal"]'),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Lidero la arquitectura y la entrega de productos web sin perder claridad técnica.",
    );
    await expect(
      page.locator("#projects").getByRole("heading", { level: 3 }),
    ).toHaveCount(3);
    await expect(
      page.getByRole("link", { name: "Cambiar a inglés" }),
    ).toHaveAttribute("href", "/en");
    await expect(
      page.getByText("Seleccioná idioma · Choose language"),
    ).toHaveCount(0);
  });

  test("localized route parity for resume and projects", async ({ page }) => {
    await page.goto("/es/resume");
    await expect(page.locator("#page-title")).toHaveText("Currículum");

    await page.goto("/en/resume");
    await expect(page.locator("#page-title")).toHaveText("Resume");

    await page.goto("/es/projects");
    await expect(page.locator("#page-title")).toHaveText("Casos");
    await expect(
      page.locator("#projects").getByRole("heading", { level: 3 }),
    ).toHaveCount(7);

    await page.goto("/en/projects");
    await expect(page.locator("#page-title")).toHaveText("Case Studies");
    await expect(
      page.locator("#projects").getByRole("heading", { level: 3 }),
    ).toHaveCount(7);
  });

  test("contact CTAs expose mailto and LinkedIn on localized home", async ({
    page,
  }) => {
    await page.goto("/en");
    await expect(
      page.getByRole("link", { name: "Contact by email" }),
    ).toHaveAttribute("href", "mailto:icordero.dev@gmail.com");
    const contactSection = page.locator("#contact");

    await expect(
      contactSection.getByRole("link", { name: "Send email" }),
    ).toHaveAttribute("href", "mailto:icordero.dev@gmail.com");
    await expect(
      contactSection.getByRole("link", { name: "LinkedIn" }),
    ).toHaveAttribute("href", /linkedin\.com/);
  });

  test("language switcher preserves #contact fragment across locales", async ({
    page,
  }) => {
    await page.goto("/#contact");

    const switcher = page.getByRole("link", { name: "Cambiar a inglés" });
    await expect(switcher).toHaveAttribute("href", "/en#contact");

    await switcher.click();
    await expect(page).toHaveURL(/\/en#contact$/);
  });

  test("marks current route in nav with active aria state", async ({
    page,
  }) => {
    await page.goto("/en/resume");

    const activeLink = page.locator('nav a[href="/en/resume"]');
    await expect(activeLink).toHaveAttribute("aria-current", "page");
    await expect(activeLink).toHaveClass(/nav-link--active/);
  });

  for (const { locale, label } of [
    { locale: "es", label: "Casos" },
    { locale: "en", label: "Cases" },
  ]) {
    test(`marks Cases as current on ${locale} project detail routes`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/projects/portfolio-modernization`);

      const casesLink = page.getByRole("link", { name: label, exact: true });
      await expect(casesLink).toHaveAttribute("aria-current", "page");
      await expect(casesLink).toHaveClass(/nav-link--active/);
    });
  }

  test("mobile navigation remains reachable and keyboard navigable", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Navegación principal" });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contacto" })).toBeVisible();

    const homeLink = nav.getByRole("link", { name: "Inicio" });
    const resumeLink = nav.getByRole("link", { name: "Currículum" });

    await homeLink.focus();
    await expect(homeLink).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(resumeLink).toBeFocused();
  });
});
