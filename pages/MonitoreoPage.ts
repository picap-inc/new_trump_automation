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
    this.monitoreoModule = page.getByText('Monitoreo');
    this.alertasLink = page.getByRole('link', { name: 'Alertas' });
    this.fechaCreacionInput = page.getByRole('textbox', { name: 'Fecha de creación' });
    this.statusSelect = page.locator('#status_cd');
    this.nombreAlertaInput = page.getByRole('textbox', { name: 'Nombre de la alerta' });
    this.alertForSelect = page.locator('#alert_for_cd');
    this.buscarButton = page.getByRole('button', { name: 'Buscar' });
    this.limpiarButton = page.getByRole('button', { name: 'Limpiar' });
    this.bandejaLink = page.getByRole('link', { name: 'Bandeja de conversaciones' });
    this.alertasCreadasLink = page.getByRole('link', { name: 'Alertas creadas' });
    this.crearNuevaAlertaBtn = page.getByRole('button', { name: 'Crear nueva alerta' });
  }

  /**
   * Navega al módulo de Monitoreo desde el menú lateral
   */
  async navigateToMonitoreo(): Promise<void> {
    await expect(this.monitoreoModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.monitoreoModule);
  }

  /**
   * Navega a la sección de Alertas
   */
  async navigateToAlertas(): Promise<void> {
    await expect(this.alertasLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.alertasLink);
  }

  /**
   * Aplica filtros de búsqueda en alertas
   */
  async applyAlertFilters(fecha: string, status: string, nombreAlerta: string, alertFor: string): Promise<void> {
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
    await expect(this.buscarButton).toBeVisible();
    await this.clickElement(this.buscarButton);
  }

  /**
   * Limpia filtros aplicados
   */
  async clearFilters(): Promise<void> {
    await expect(this.limpiarButton).toBeVisible();
    await this.clickElement(this.limpiarButton);
    await this.waitHelpers.wait(testConfig.waits.shortDelay);
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
    await expect(this.alertasCreadasLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.alertasCreadasLink);
    await this.waitHelpers.wait(5000);
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
    const nombreInput = this.page.getByRole('textbox', { name: 'Nombre', exact: true });
    await this.fillInput(nombreInput, nombre);

    const alertaParaSelect = this.page.locator('#text_based_alert_alert_for_cd');
    await alertaParaSelect.selectOption({ label: alertaPara });

    const tipoAlertaSelect = this.page.locator('#text_based_alert_alert_kind_cd');
    await tipoAlertaSelect.selectOption({ label: tipoAlerta });

    const descripcionInput = this.page.getByRole('textbox', { name: 'Descripción' });
    await this.fillInput(descripcionInput, descripcion);

    const mensajeInput = this.page.getByRole('textbox', { name: 'Mensaje o palabra clave (' });
    await this.fillInput(mensajeInput, mensaje);

    await this.waitHelpers.wait(2000);
  }

  /**
   * Cancela el formulario de nueva alerta
   */
  async cancelNewAlertForm(): Promise<void> {
    const cancelarBtn = this.page.getByRole('button', { name: 'Cancelar' });
    await expect(cancelarBtn).toBeVisible();
    await this.clickElement(cancelarBtn);
  }
}

