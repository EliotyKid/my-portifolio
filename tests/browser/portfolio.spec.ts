import { expect, test } from "@playwright/test";

const slugs = ["forma", "oryzo", "slush", "alex-morgan", "nexus-one"];

test("desktop list opens each real case study and exposes a working demo", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Elias Rodrigues",
  );
  await expect
    .poll(() =>
      page
        .locator(".route-curtain")
        .evaluate((el) => el.getBoundingClientRect().bottom),
    )
    .toBeLessThan(0);
  await expect(page.locator(".project-row")).toHaveCount(5);
  for (const slug of slugs) {
    await page.goto("/work");
    await page.locator(`.project-row[href="/work/${slug}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}$`));
    const visit = page.getByRole("link", { name: /Explorar o site/ });
    const href = await visit.getAttribute("href");
    expect(href).toBe(`/demos/${slug}/index.html`);
    expect((await request.get(`/demos/${slug}/index.html`)).status()).toBe(200);
  }
  expect(errors).toEqual([]);
});

test("project listing switches on desktop and becomes a grid on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/work");
  const list = page.locator(".project-list");
  const listButton = page.getByRole("button", { name: "Lista", exact: true });
  const gridButton = page.getByRole("button", { name: "Grade", exact: true });
  await expect(listButton).toHaveAttribute("aria-pressed", "true");
  await expect(list).not.toHaveClass(/is-grid/);
  await gridButton.click();
  await expect(gridButton).toHaveAttribute("aria-pressed", "true");
  await expect(list).toHaveClass(/is-grid/);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await expect(page.getByRole("button", { name: "Grade" })).toBeHidden();
  await expect(list).toHaveCSS("display", "grid");
  await expect(page.locator(".project-mobile-image").first()).toBeVisible();

  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Grade" })).toHaveCount(0);
  await expect(page.locator(".project-list")).not.toHaveClass(/is-grid/);
});

test("language selection preserves the page and survives internal navigation", async ({
  page,
}) => {
  await page.goto("/work/forma");
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL("/work/forma?lang=en");
  await expect(
    page.getByRole("heading", { name: "About the project" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "Back to projects" }).click();
  await expect(page).toHaveURL("/work?lang=en");
  await page.getByRole("link", { name: "Game development" }).click();
  await expect(page).toHaveURL("/work/gamedev?lang=en");
  await expect(page.locator(".project-row")).toHaveCount(0);
  await expect(
    page.getByText("Game projects will be featured here.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Português", exact: true }).click();
  await expect(page).toHaveURL("/work/gamedev");
});

test("mobile menu traps focus, closes with Escape and navigates", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await dialog.getByRole("link", { name: "English" }).focus();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: /Fechar/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(menu).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await menu.click();
  await dialog.getByRole("link", { name: /Projetos/ }).click();
  await expect(page).toHaveURL("/work");
  await expect(dialog).toHaveCount(0);
  await expect(page.locator(".project-mobile-image").first()).toBeVisible();
  await page.locator(".project-row").first().click();
  await expect(page).toHaveURL("/work/forma");
});

test("all portfolio pages fit mobile widths in both languages", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [
      "/",
      "/work",
      "/work/webdev",
      "/work/gamedev",
      "/about",
      "/contact",
      ...slugs.map((slug) => `/work/${slug}`),
    ]) {
      for (const suffix of ["", "?lang=en"]) {
        await page.goto(`${route}${suffix}`);
        const dimensions = await page.evaluate(() => ({
          viewport: innerWidth,
          content: document.documentElement.scrollWidth,
        }));
        expect(
          dimensions.content,
          `${route}${suffix} at ${width}px`,
        ).toBeLessThanOrEqual(dimensions.viewport + 1);
      }
    }
  }
});

test("reduced motion stops marquee and minimizes transitions; English HTML works without JavaScript", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?lang=en");
  await expect(page.locator(".project-mobile-image").first()).toBeVisible();
  const track = page.locator(".hero-marquee-track");
  const before = await track.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(250);
  expect(await track.evaluate((el) => getComputedStyle(el).transform)).toBe(
    before,
  );
  expect(
    await page
      .locator(".route-curtain")
      .evaluate((el) => parseFloat(getComputedStyle(el).animationDuration)),
  ).toBeLessThan(0.01);
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noJs = await context.newPage();
  await noJs.goto("/about?lang=en");
  await expect(noJs.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    noJs.getByRole("heading", { name: "Code, motion and purpose." }),
  ).toBeVisible();
  await context.close();
});

test("form preserves values on failure, prevents duplicate pending sends and confirms success", async ({
  page,
}) => {
  await page.goto("/contact?lang=en");
  await page.getByLabel("What is your name?").fill("Client");
  await page.getByLabel("What is your email?").fill("client@example.com");
  await page
    .getByLabel("What shall we create together?")
    .fill("An interactive website for my company.");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: '{"error":"delivery_failed"}',
    }),
  );
  await page.getByRole("button", { name: /Send message/ }).click();
  await expect(page.getByRole("status")).toContainText("could not be sent");
  await expect(page.getByLabel("What is your name?")).toHaveValue("Client");
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"success":true}',
    });
  });
  await page.getByRole("button", { name: /Send message/ }).click();
  await expect(page.getByRole("button", { name: /Sending/ })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("Message sent!");
  await expect(page.locator(".form-success-icon")).toBeVisible();
  await expect(page.getByLabel("What is your name?")).toHaveValue("");
  await expect(page.getByLabel("What is your name?")).toBeHidden();
  await page.getByRole("button", { name: "Send another message" }).click();
  await expect(page.getByLabel("What is your name?")).toBeFocused();
  await expect(page.locator(".form-success-icon")).toHaveCount(0);
});

test("project preview slides inside a fixed mask", async ({ page }) => {
  await page.goto("/work");
  const rows = page.locator(".project-row");
  await rows.nth(0).hover();
  const mask = page.locator(".preview-mask");
  await expect(mask).toBeVisible();
  await expect(mask).toHaveCSS("overflow", "hidden");
  await expect(mask).toHaveCSS("width", "380px");
  await expect(mask).toHaveCSS("height", "280px");
  await rows.nth(1).hover();
  await expect(mask.locator(".preview-image")).toHaveCount(2);
  await expect(mask.locator(".preview-image")).toHaveCount(1);
});

for (const slug of slugs) {
  test(`demo ${slug} renders its assets on desktop and mobile`, async ({
    page,
  }) => {
    const errors: string[] = [];
    const failed: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        failed.push(`${response.status()} ${response.url()}`);
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      await page.goto(`/demos/${slug}/index.html`, {
        waitUntil: "networkidle",
      });
      await expect(page.locator("h1").first()).toBeVisible();
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
      });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width + 1);
      const broken = await page
        .locator("img")
        .evaluateAll((images) =>
          images
            .filter(
              (image) =>
                image instanceof HTMLImageElement &&
                image.getAttribute("src") &&
                (!image.complete || image.naturalWidth === 0),
            )
            .map((image) => image.getAttribute("src")),
        );
      expect(broken).toEqual([]);
    }
    expect(errors).toEqual([]);
    expect(failed).toEqual([]);
  });
}

test("automatic marquee has a keyboard-operable pause control", async ({
  page,
}) => {
  await page.goto("/");
  const pause = page.getByRole("button", { name: "Pausar letreiro" });
  await expect(pause).toBeVisible();
  await pause.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Retomar letreiro" }),
  ).toHaveAttribute("aria-pressed", "true");
  const track = page.locator(".hero-marquee-track");
  const before = await track.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(150);
  expect(await track.evaluate((el) => getComputedStyle(el).transform)).toBe(
    before,
  );
  await page.getByRole("button", { name: "Retomar letreiro" }).click();
  await expect(
    page.getByRole("button", { name: "Pausar letreiro" }),
  ).toHaveAttribute("aria-pressed", "false");
});

test("wide touch tablets see project images without hover", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 1024, height: 900 },
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/work");
  await expect(page.locator(".project-mobile-image").first()).toBeVisible();
  await expect(page.locator(".project-preview")).toBeHidden();
  await page.locator(".project-row").first().click();
  await expect(page).toHaveURL("/work/forma");
  await context.close();
});

test("page transitions retain the animated SVG curve", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('svg[data-curve="page"] path')).toHaveCount(1);
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Sobre", exact: true })
    .click();
  await expect(page).toHaveURL("/about");
  await expect(page.locator('svg[data-curve="page"] path')).toHaveCount(1);
  await expect
    .poll(() =>
      page
        .locator(".route-curtain")
        .evaluate((el) => el.getBoundingClientRect().bottom),
    )
    .toBeLessThan(0);
});

test("mobile menu retains its SVG edge and keyboard behavior", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.locator('svg[data-curve="menu"] path')).toHaveCount(1);
  await expect
    .poll(() => page.locator('svg[data-curve="menu"] path').getAttribute("d"))
    .toBe("M100 0 L100 1000 Q100 500 100 0");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
});

test("footer curve follows scroll and stays static with reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const curve = page.locator('svg[data-curve="footer"] path');
  await expect(curve).toHaveCount(1);
  const initial = await curve.getAttribute("d");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect.poll(() => curve.getAttribute("d")).not.toBe(initial);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() => curve.getAttribute("d"))
    .toBe("M0 0 L1000 0 Q500 0 0 0 Z");
});

test("desktop scrolling restores the floating menu and its SVG curve", async ({
  page,
}) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await expect(menu).toBeHidden();
  await page.locator(".project-list").scrollIntoViewIfNeeded();
  await menu.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator('svg[data-curve="menu"] path')).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("mobile hamburger remains accessible while scrolling through the page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  for (const position of [1000, 2100]) {
    await page.evaluate((y) => scrollTo(0, y), position);
    await expect(menu).toBeInViewport();
    const box = await menu.boundingBox();
    expect(box?.y).toBeGreaterThanOrEqual(12);
    expect(box?.y).toBeLessThanOrEqual(30);
  }
  await menu.click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("mobile contact button centers its label and SVG within the circle", async ({
  page,
}) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
    const button = page.locator(".footer-contact .circle-link");
    const label = button.locator(".circle-label");
    await expect(label).toBeVisible();
    await expect(button.locator("svg")).toHaveCount(1);
    const box = await button.boundingBox();
    const text = await label.boundingBox();
    if (!box || !text) throw new Error("Contact button missing");
    expect(
      Math.abs(text.x + text.width / 2 - box.x - box.width / 2),
    ).toBeLessThan(2);
    expect(text.x).toBeGreaterThan(box.x + 10);
    expect(text.x + text.width).toBeLessThan(box.x + box.width - 10);
    expect(Math.abs(box.x + box.width / 2 - width / 2)).toBeLessThan(2);
  }
});

test("portfolio arrows are SVGs driven by scroll and respect reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const arrow = page.locator(".footer-title .scroll-arrow");
  await expect(arrow.locator("svg path")).toHaveCount(1);
  const initial = await arrow.evaluate((el) => getComputedStyle(el).transform);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect
    .poll(() => arrow.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(initial);
  expect(await page.locator("body").innerText()).not.toMatch(/[↗↘↓←]/u);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(arrow).toHaveCSS("transform", "none");
});

test("opening the menu does not scroll its overlay and clip the SVG edge", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const samples = await page.evaluate(async () => {
    const frames = [];
    for (let n = 0; n < 30; n++) {
      await new Promise(requestAnimationFrame);
      const backdrop = document.querySelector(".menu-backdrop");
      const curve = document.querySelector('svg[data-curve="menu"] path');
      const box = curve?.getBoundingClientRect();
      frames.push({
        scroll: backdrop?.scrollLeft || 0,
        visible:
          !!box && box.width > 5 && box.right > 5 && box.left < innerWidth,
      });
    }
    return frames;
  });
  expect(samples.every((frame) => frame.scroll === 0)).toBe(true);
  expect(samples.some((frame) => frame.visible)).toBe(true);
});

test("navigation from a scrolled menu starts the next page at the top", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work");
  await page.evaluate(() => scrollTo({ top: 900, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(600);
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.getByRole("dialog").getByRole("link", { name: /Sobre/ }).click();
  await page.waitForURL("**/about");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.goBack();
  await page.waitForURL("**/work");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.goForward();
  await page.waitForURL("**/about");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page
    .locator("footer")
    .getByRole("link", { name: /Vamos conversar/ })
    .click();
  await page.waitForURL("**/contact");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test("original menu has simple staggered links, an active dot and a circular close button", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work/forma");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".menu-index")).toHaveCount(0);
  await expect(dialog.locator(".menu-nav .scroll-arrow")).toHaveCount(0);
  await expect(dialog.locator('.menu-nav a[aria-current="page"]')).toHaveText(
    "Projetos",
  );
  await expect(
    dialog.locator('.menu-link:has(a[aria-current="page"]) .menu-indicator'),
  ).toHaveCount(1);
  const close = dialog.getByRole("button", { name: "Fechar", exact: true });
  await expect(close).toHaveCSS("border-radius", "50%");
  await expect(close.locator(".menu-lines")).toHaveCount(1);
});

test("section anchors still scroll within the current page", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('.hero-bottom a[href="#selected-work"]').click();
  await expect(page).toHaveURL(/#selected-work$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(500);
});
