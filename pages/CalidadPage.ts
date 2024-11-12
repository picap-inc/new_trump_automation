import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * CalidadPage - Módulo de Calidad
 */
export class CalidadPage extends BasePage {
  private readonly calidadModule: Locator;
  private readonly dashboardLink: Locator;
  private readonly matrizLink: Locator;
  private readonly dateTrigger: Locator;
  private readonly calendar: Locator;
  private readonly procesoSelect: Locator;
  private readonly buscarButton: Locator;
  private readonly auditoriasButton: Locator;

  constructor(page: Page) {
    super(page);
    this.calidadModule = page.locator('#mySidenav').getByText('Calidad', { exact: true });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard Calidad' });
    this.matrizLink = page.getByRole('link', { name: 'Matriz de Calidad' });
    this.dateTrigger = page.locator('[data-quality-dashboard-target="AuditsQuantityDate"]');
    this.calendar = page.locator('.flatpickr-calendar.open');
    this.procesoSelect = page.locator('#list_matrix_audit_frame #quality_process_id');
    this.buscarButton = page.getByRole('button', { name: 'Buscar' });
    this.auditoriasButton = page.getByRole('button', { name: 'Auditorías' });
  }

  /**
   * Navega al módulo de Calidad desde el menú lateral
   */
  async navigateToCalidad(): Promise<void> {
    await expect(this.calidadModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.calidadModule);
  }

  /**
   * Navega al Dashboard de Calidad
   */
  async navigateToDashboard(): Promise<void> {
    await expect(this.dashboardLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.dashboardLink);
  }

  /**
   * Navega a la Matriz de Calidad
   */
  async navigateToMatriz(): Promise<void> {
    await expect(this.matrizLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.matrizLink);
  }

  /**
   * Filtra por proceso y abre auditorías
   */
  async filterByProcesoAndOpenAuditorias(proceso: string): Promise<void> {
    await expect(this.procesoSelect).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.procesoSelect.selectOption({ label: proceso });
    
    // Esperar a que se aplique el filtro
    await this.waitHelpers.wait(1000);
    
    await expect(this.buscarButton).toBeEnabled();
    await this.clickElement(this.buscarButton);
    
    // Esperar a que se carguen los resultados
    await this.page.waitForLoadState('networkidle');
    await this.waitHelpers.wait(2000);
    
    await expect(this.auditoriasButton).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.auditoriasButton);
    
    // Esperar a que se abra el modal/página de auditorías
    await this.waitHelpers.wait(2000);
  }

  /**
   * Selecciona rango de fechas dinámico (del día 1 al día actual del mes)
   * Usa Flatpickr calendar widget
   */
  async selectCurrentMonthDateRange(): Promise<void> {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesIngles = fechaActual.toLocaleString('en-US', { month: 'long' });

    // Abrir calendario
    await expect(this.dateTrigger).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.dateTrigger);

    // Esperar que el calendario esté visible
    await expect(this.calendar).toBeVisible({ timeout: 5000 });

    // Seleccionar día 1
    const labelDia1 = `${mesIngles} 1,`;
    const dia1 = this.page.getByLabel(labelDia1).first();
    await expect(dia1).toBeVisible({ timeout: 5000 });
    await this.clickElement(dia1);

    // Seleccionar día actual
    const labelDiaActual = `${mesIngles} ${diaActual},`;
    const diaHoy = this.page.getByLabel(labelDiaActual).first();
    await expect(diaHoy).toBeVisible({ timeout: 5000 });
    await this.clickElement(diaHoy);

    // Esperar a que se aplique el cambio
    await this.waitHelpers.wait(2000);
  }
}

