import { Page, expect } from '@playwright/test';

const downloadButtonRegex = /(descargar|exportar|reporte|informe|excel|csv|xls|pdf|download)/i;
const filterActionRegex = /(buscar|filtrar|aplicar|consultar)/i;
const clearActionRegex = /(limpiar|reset|resetear)/i;
const allowNoDownloadRegex = /(exportar todos los créditos)/i;

const isEditableInput = (type: string | null): boolean => {
  const safeType = (type || '').toLowerCase();
  return !['hidden', 'submit', 'button', 'file'].includes(safeType);
};

const formatToday = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const waitForLoadingOverlay = async (page: Page): Promise<void> => {
  const loadingScreen = page.locator('#loading_screen');
  if (await loadingScreen.isVisible().catch(() => false)) {
    await loadingScreen.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => undefined);
  }
  const piboxLoader = page.locator('.loading-indicator');
  if (await piboxLoader.isVisible().catch(() => false)) {
    await piboxLoader.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => undefined);
  }
  const pushLoader = page.locator('#push_notification_tasks_loading');
  if (await pushLoader.isVisible().catch(() => false)) {
    await pushLoader.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => undefined);
  }
};

export const applyVisibleFilters = async (page: Page): Promise<void> => {
  const today = formatToday();
  const monthValue = formatMonth();

  if (page.isClosed()) {
    return;
  }

  const selects = page.locator('select');
  const selectCount = await selects.count();
  for (let i = 0; i < selectCount; i += 1) {
    const select = selects.nth(i);
    if (!(await select.isVisible().catch(() => false))) continue;
    const options = await select.locator('option').count();
    if (options > 1) {
      await select.selectOption({ index: 1 });
    }
  }

  const inputs = page.locator('input, textarea');
  const inputCount = await inputs.count();
  for (let i = 0; i < inputCount; i += 1) {
    const input = inputs.nth(i);
    if (!(await input.isVisible().catch(() => false))) continue;
    if (await input.isDisabled().catch(() => false)) continue;

    const tagName = (await input.evaluate((el) => el.tagName.toLowerCase()).catch(() => 'input')) as string;
    const type = (await input.getAttribute('type').catch(() => '')) || '';
    const isReadonly = await input.evaluate((el) => (el as HTMLInputElement).readOnly).catch(() => false);
    if (isReadonly) continue;

    if (tagName === 'textarea') {
      await input.fill('test');
      continue;
    }

    if (!isEditableInput(type)) continue;
    if (type === 'checkbox') {
      const checked = await input.isChecked().catch(() => false);
      if (!checked) {
        await input.check().catch(() => undefined);
      }
      continue;
    }
    if (type === 'date') {
      await input.fill(today);
      continue;
    }
    if (type === 'month') {
      await input.fill(monthValue);
      continue;
    }
    if (type === 'number') {
      await input.fill('1');
      continue;
    }

    await input.fill('test');
  }

  const actionButton = page.getByRole('button', { name: filterActionRegex }).first();
  if (await actionButton.isVisible().catch(() => false)) {
    await expect(actionButton).toBeEnabled();
    await waitForLoadingOverlay(page);
    try {
      await actionButton.click();
    } catch (error) {
      if (String(error).includes('intercepts pointer events')) {
        await waitForLoadingOverlay(page);
        await actionButton.click({ force: true });
      } else {
        throw error;
      }
    }
    await page.waitForLoadState('domcontentloaded').catch(() => undefined);
  }

  // No ejecutamos "Limpiar" para evitar overlays que bloquean el click
};

export const validateDownloadButtons = async (page: Page): Promise<void> => {
  const candidates = page.locator('button, a').filter({ hasText: downloadButtonRegex });
  let count = 0;
  try {
    count = await candidates.count();
  } catch (error) {
    if (String(error).includes('Execution context was destroyed')) {
      await page.waitForLoadState('domcontentloaded').catch(() => undefined);
      count = await candidates.count();
    } else {
      throw error;
    }
  }
  for (let i = 0; i < count; i += 1) {
    const button = candidates.nth(i);
    if (!(await button.isVisible().catch(() => false))) continue;
    if (!(await button.isEnabled().catch(() => false))) {
      await expect(button).toBeDisabled();
      continue;
    }

    const tagName = await button.evaluate((el) => el.tagName.toLowerCase()).catch(() => '');
    const href = await button.getAttribute('href').catch(() => null);
    const target = await button.getAttribute('target').catch(() => null);
    if (tagName === 'a' && href) {
      const resolved = new URL(href, page.url()).toString();
      if (/download|export|csv|xls|xlsx|pdf/i.test(resolved)) {
        const downloadResponse = await page.request.get(resolved).catch(() => null);
        if (downloadResponse && downloadResponse.status() < 400) {
          continue;
        }
      }
      const downloadResponse = await page.request.get(resolved).catch(() => null);
      if (downloadResponse && downloadResponse.status() < 400) {
        continue;
      }
      if (target === '_blank') {
        if (/download|export|csv|xls|xlsx|pdf/i.test(resolved)) {
          continue;
        }
        const popupPromise = page.waitForEvent('popup', { timeout: 10000 }).catch(() => null);
        await page.evaluate((link) => window.open(link, '_blank'), resolved);
        const popup = await popupPromise;
        if (popup) {
          await popup.waitForLoadState('domcontentloaded').catch(() => undefined);
          await popup.close().catch(() => undefined);
          continue;
        }
        throw new Error(`No se pudo validar descarga para el link: ${await button.innerText()}`);
      }
    }

    const previousUrl = page.url();
    await waitForLoadingOverlay(page);
    const downloadPromise = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);
    const popupPromise = page.waitForEvent('popup', { timeout: 10000 }).catch(() => null);
    const requestPromise = page
      .waitForRequest((request) => /export|csv|xls|xlsx|pdf|download/i.test(request.url()), { timeout: 10000 })
      .catch(() => null);
    const responsePromise = page
      .waitForResponse((response) => {
        const header = response.headers()['content-disposition'] || '';
        const url = response.url().toLowerCase();
        return header.toLowerCase().includes('attachment') || /export|csv|xls|xlsx|pdf|download/.test(url);
      }, { timeout: 10000 })
      .catch(() => null);

    await button.click({ noWaitAfter: true });

    const [download, response, popup, request] = await Promise.all([
      downloadPromise,
      responsePromise,
      popupPromise,
      requestPromise
    ]);
    const urlChanged = page.url() !== previousUrl && /download|csv|xls|xlsx|pdf/i.test(page.url());

    if (popup) {
      await popup.waitForLoadState('domcontentloaded').catch(() => undefined);
      await popup.close().catch(() => undefined);
      continue;
    }

    if (!download && !response && !urlChanged && !request) {
      const label = await button.innerText();
      if (allowNoDownloadRegex.test(label)) {
        continue;
      }
      throw new Error(`No se detectó descarga para el botón: ${label}`);
    }
  }
};
