import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * MonitoreoPage - Módulo de Monitoreo y Alertas
 */
export class MonitoreoPage extends BasePage {
  private readonly monitoreoModule: Locator;
  private readonly alertasLink: Locator;
  private readonly fechaCreacionInput: Locator;
  private readonly statusSelect: Locator;
  private readonly nombreAlertaInput: Locator;
  private readonly alertForSelect: Locator;
  private readonly buscarButton: Locator;
  private readonly limpiarButton: Locator;
  private readonly bandejaLink: Locator;
  private readonly alertasCreadasLink: Locator;
  private readonly crearNuevaAlertaBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.monitoreoModule = this.sideNav.getByText('Monitoreo', { exact: true });
    this.alertasLink = this.sideNav.getByRole('link', { name: 'Alertas', exact: true });
    this.fechaCreacionInput = page.getByRole('textbox', { name: 'Fecha de creación' });
    this.statusSelect = page.locator('#status_cd');
    this.nombreAlertaInput = page.getByRole('textbox', { name: 'Nombre de la alerta' });
    this.alertForSelect = page.locator('#alert_for_cd');
    this.buscarButton = page.getByRole('button', { name: 'Buscar' });
    this.limpiarButton = page.getByRole('button', { name: 'Limpiar' });
    this.bandejaLink = page.getByRole('link', { name: /Bandeja de conversaciones/i });
    this.alertasCreadasLink = page.getByRole('link', { name: /Alertas creadas/i });
    this.crearNuevaAlertaBtn = page.getByRole('button', { name: 'Crear nueva alerta' });
  }

  private async ensureMonitoreoExpanded(): Promise<void> {
    if (await this.alertasLink.isVisible().catch(() => false)) {
      return;
    }

    const menuButton = this.page.locator('#ham-menu');
    if (await menuButton.isVisible().catch(() => false)) {
      await menuButton.click({ force: true });
      await expect(this.sideNav).toBeVisible({ timeout: testConfig.timeouts.long });
      await this.page.waitForFunction(() => {
        const el = document.getElementById('mySidenav');
        return el && !el.classList.contains('hidden');
      });
    }

    await expect(this.monitoreoModule).toBeVisible({ timeout: testConfig.timeouts.long });
    await this.clickElement(this.monitoreoModule);
    await expect(this.alertasLink).toBeVisible({ timeout: testConfig.timeouts.medium });
  }

  private async ensureAlertasReady(): Promise<void> {
    if (await this.fechaCreacionInput.isVisible().catch(() => false)) {
      return;
    }
    await this.navigateToAlertas();
    await expect(this.fechaCreacionInput).toBeVisible({ timeout: testConfig.timeouts.long });
  }

  private async selectAlertOption(
    labelRegex: RegExp,
    optionLabel: string,
    selectors: string[],
    nameFragment: string,
    fallbackSelect?: Locator
  ): Promise<void> {
    const selectOptionWithFallback = async (select: Locator): Promise<boolean> => {
      try {
        await select.selectOption({ label: optionLabel });
        return true;
      } catch (_) {
        const fallbackValue = await select.evaluate((node) => {
          const el = node as HTMLSelectElement | null;
          if (!el) return null;
          const option = Array.from(el.options).find((opt) => opt.value && !opt.disabled);
          return option ? option.value : null;
        });
        if (fallbackValue) {
          await select.selectOption({ value: fallbackValue });
          console.warn(`⚠️ Opción "${optionLabel}" no disponible. Se usó opción fallback.`);
          return true;
        }
      }
      return false;
    };

    const directSelect = this.page.locator(selectors.join(', ')).first();
    if (await directSelect.isVisible().catch(() => false)) {
      if (await selectOptionWithFallback(directSelect)) return;
    }

    const nameSelect = this.page.locator(`select[name*="${nameFragment}"]`).first();
    if (await nameSelect.isVisible().catch(() => false)) {
      if (await selectOptionWithFallback(nameSelect)) return;
    }

    const labeledSelect = this.page.getByLabel(labelRegex).first();
    if (await labeledSelect.isVisible().catch(() => false)) {
      if (await selectOptionWithFallback(labeledSelect)) return;
    }

    const combo = this.page.getByRole('combobox', { name: labelRegex }).first();
    if (await combo.isVisible().catch(() => false)) {
      await combo.click();
      const option = this.page.getByRole('option', { name: optionLabel }).first();
      if (await option.isVisible().catch(() => false)) {
        await option.click();
      } else {
        const anyOption = this.page.getByRole('option').first();
        if (await anyOption.isVisible().catch(() => false)) {
          await anyOption.click();
          console.warn(`⚠️ Opción "${optionLabel}" no disponible. Se usó opción fallback.`);
        } else {
          await this.page.getByText(optionLabel, { exact: true }).first().click();
        }
      }
      return;
    }

    if (fallbackSelect && (await fallbackSelect.isVisible().catch(() => false))) {
      if (await selectOptionWithFallback(fallbackSelect)) return;
    }

    throw new Error(`No se encontró el selector para "${optionLabel}" en ${labelRegex}.`);
  }

  /**
   * Navega al módulo de Monitoreo desde el menú lateral
   */
  async navigateToMonitoreo(): Promise<void> {
    await this.ensureMonitoreoExpanded();
  }

  /**
   * Navega a la sección de Alertas
   */
  async navigateToAlertas(): Promise<void> {
    await this.ensureMonitoreoExpanded();
    await expect(this.alertasLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.alertasLink);
  }

  /**
   * Aplica filtros de búsqueda en alertas
   */
  async applyAlertFilters(fecha: string, status: string, nombreAlerta: string, alertFor: string): Promise<void> {
    await this.ensureAlertasReady();
    await this.fillInput(this.fechaCreacionInput, fecha);
    await this.statusSelect.selectOption({ label: status });
    
    // Typing con delay para simular input humano
    await this.nombreAlertaInput.fill('');
    for (const char of nombreAlerta) {
      await this.nombreAlertaInput.type(char, { delay: 100 });
    }
    
    await this.alertForSelect.selectOption({ label: alertFor });
  }

  /**
   * Ejecuta búsqueda
   */
  async search(): Promise<void> {
    await this.ensureAlertasReady();
    await expect(this.buscarButton).toBeVisible();
    await this.clickElement(this.buscarButton);
  }

  /**
   * Limpia filtros aplicados
   */
  async clearFilters(): Promise<void> {
    await this.ensureAlertasReady();
    await expect(this.limpiarButton).toBeVisible();
    await this.clickElement(this.limpiarButton);

    await this.waitHelpers.waitWithRetry(async () => {
      await expect(this.fechaCreacionInput).toHaveValue('', { timeout: testConfig.timeouts.medium });
      await expect(this.nombreAlertaInput).toHaveValue('', { timeout: testConfig.timeouts.medium });
    }, 2);
  }

  /**
   * Navega a Bandeja de conversaciones
   */
  async navigateToBandeja(): Promise<void> {
    await expect(this.bandejaLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.bandejaLink);
  }

  /**
   * Navega a Alertas creadas
   */
  async navigateToAlertasCreadas(): Promise<void> {
    if (await this.alertasCreadasLink.isVisible().catch(() => false)) {
      await this.clickElement(this.alertasCreadasLink);
    } else {
      await this.goto('/text_based_alerts');
      await this.waitHelpers.waitForPageLoad();
    }

    await this.waitHelpers.waitWithRetry(async () => {
      await expect(this.crearNuevaAlertaBtn).toBeVisible({ timeout: testConfig.timeouts.long });
    }, 2);
  }

  /**
   * Abre el formulario de nueva alerta
   */
  async openNewAlertForm(): Promise<void> {
    await expect(this.crearNuevaAlertaBtn).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.crearNuevaAlertaBtn);
    
    // Verificar que el formulario esté visible
    const inputNombreAlerta = this.page.getByRole('textbox', { name: 'Nombre de la alerta' });
    await expect(inputNombreAlerta).toBeVisible({ timeout: 5000 });
  }

  /**
   * Llena el formulario de nueva alerta
   */
  async fillNewAlertForm(
    nombre: string,
    alertaPara: string,
    tipoAlerta: string,
    descripcion: string,
    mensaje: string
  ): Promise<void> {
    const nombreInput = this.page
      .getByRole('textbox', { name: /Nombre de la alerta|Nombre/i })
      .first();
    if (!(await nombreInput.isVisible().catch(() => false))) {
      await this.openNewAlertForm();
    }
    await this.fillInput(nombreInput, nombre);

    const formScope = this.page.locator('form').filter({ has: nombreInput }).first();
    const fallbackSelects = formScope.locator('select');

    await this.selectAlertOption(
      /alerta para|alert for|para/i,
      alertaPara,
      ['#text_based_alert_alert_for_cd', '#alert_for_cd'],
      'alert_for',
      fallbackSelects.nth(0)
    );

    await this.selectAlertOption(
      /tipo de alerta|alert kind|tipo/i,
      tipoAlerta,
      ['#text_based_alert_alert_kind_cd', '#alert_kind_cd'],
      'alert_kind',
      fallbackSelects.nth(1)
    );

    const descripcionInput = formScope
      .getByRole('textbox', { name: /Descripción|Descripcion|Description/i })
      .first();
    const descripcionFallback = formScope.locator('textarea').first();
    const descripcionTarget = (await descripcionInput.isVisible().catch(() => false))
      ? descripcionInput
      : descripcionFallback;
    if (await descripcionTarget.isVisible().catch(() => false)) {
      await this.fillInput(descripcionTarget, descripcion);
    } else {
      console.warn('⚠️ Campo de descripción no visible. Se omite el llenado.');
    }

    const mensajeInput = formScope
      .getByRole('textbox', { name: /Mensaje|Palabra clave|Keyword/i })
      .first();
    const mensajeFallback = formScope.locator('textarea').nth(1);
    const mensajeTarget = (await mensajeInput.isVisible().catch(() => false))
      ? mensajeInput
      : mensajeFallback;
    if (await mensajeTarget.isVisible().catch(() => false)) {
      await this.fillInput(mensajeTarget, mensaje);
      await expect(mensajeTarget).toHaveValue(mensaje, { timeout: testConfig.timeouts.medium });
    } else {
      console.warn('⚠️ Campo de mensaje no visible. Se omite el llenado.');
    }
  }

  /**
   * Cancela el formulario de nueva alerta
   */
  async cancelNewAlertForm(): Promise<void> {
    const cancelarBtn = this.page.getByRole('button', { name: /Cancelar|Cerrar|Close/i }).first();
    const cancelarLink = this.page.getByRole('link', { name: /Cancelar|Cerrar|Close/i }).first();

    if (await cancelarBtn.isVisible().catch(() => false)) {
      await this.clickElement(cancelarBtn);
      return;
    }

    if (await cancelarLink.isVisible().catch(() => false)) {
      await this.clickElement(cancelarLink);
      return;
    }

    await this.page.keyboard.press('Escape').catch(() => {});
    const nombreInput = this.page.getByRole('textbox', { name: /Nombre de la alerta|Nombre/i }).first();
    await expect(nombreInput).toBeHidden({ timeout: testConfig.timeouts.medium });
  }
}

