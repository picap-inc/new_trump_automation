import { expect, type Page } from '@playwright/test';

const baseUrl = 'https://admin.picap.io';

export async function gotoMarketingLink(
  page: Page,
  label: RegExp,
  fallbackPath?: string
): Promise<string> {
  if (fallbackPath) {
    const directUrl = fallbackPath.startsWith('http') ? fallbackPath : `${baseUrl}${fallbackPath}`;
    await page.goto(directUrl, { waitUntil: 'domcontentloaded' });
    return directUrl;
  }

  await page.goto(`${baseUrl}/marketing_dashboard`, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/marketing_dashboard/);

  const sideNav = page.locator('#mySidenav');
  const link = sideNav.getByRole('link', { name: label }).first();
  const count = await link.count();
  const href = count > 0 ? await link.getAttribute('href') : null;
  const target = href ?? fallbackPath;

  if (!target) {
    throw new Error(`No se encontró href para ${label}`);
  }

  const url = target.startsWith('http') ? target : `${baseUrl}${target}`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  return url;
}
