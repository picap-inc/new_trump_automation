import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * ServiciosPage - Módulo de Servicios
 */
export class ServiciosPage extends BasePage {
  private readonly serviciosModule: Locator;
  private readonly todosServiciosLink: Locator;
  private readonly pqrsLink: Locator;
  private readonly cardsPqrsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.serviciosModule = page.locator('#mySidenav').getByText('Servicios', { exact: true });
    this.todosServiciosLink = page.locator('#mySidenav').getByRole('link', { name: 'Todos los servicios' });
    this.pqrsLink = page.locator('#mySidenav').getByRole('link', { name: 'PQRS' });
    this.cardsPqrsLink = page.locator('#mySidenav').getByRole('link', { name: 'Cards PQRS' });
  }

  /**
   * Navega al módulo de Servicios desde el menú lateral
   */
  async navigateToServicios(): Promise<void> {
    await expect(this.serviciosModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.serviciosModule);
    await expect(this.todosServiciosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
  }

  /**
   * Navega a la sección "Todos los servicios"
   */
  async navigateToTodosServicios(): Promise<void> {
    await expect(this.todosServiciosLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.todosServiciosLink);
    // Esperar a que cargue la página
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForURL(/\/bookings$/, { timeout: testConfig.timeouts.long });
    await this.expectURL('https://admin.picap.io/bookings');
  }

  /**
   * Navega a la sección de PQRS
   */
  async navigateToPQRS(): Promise<void> {
    await expect(this.pqrsLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.pqrsLink);
    // Esperar a que cargue la página de PQRS
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForURL(/\/pqrs$/, { timeout: testConfig.timeouts.long });
  }

  /**
   * Navega a la sección de Cards PQRS
   */
  async navigateToCardsPQRS(): Promise<void> {
    await expect(this.cardsPqrsLink).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.cardsPqrsLink);
    // Esperar a que cargue la página de Cards PQRS
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verifica que la página de servicios esté cargada
   */
  async verifyServiciosPageLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Mueve un card entre estados (drag and drop en sistema Kanban)
   */
  async moveCard(from: string, to: string): Promise<void> {
    // Los cards PQRS usan drag and drop
    // Esta es una implementación básica que puede necesitar ajustes según la UI
    const fromCard = this.page.locator(`[data-status="${from}"] .card`).first();
    const toColumn = this.page.locator(`[data-status="${to}"]`);
    
    await fromCard.dragTo(toColumn);
  }

  /**
   * Aplica filtros en PQRS
   */
  async applyPQRSFilters(fechaDesde?: string, fechaHasta?: string): Promise<void> {
    if (fechaDesde) {
      const desdeInput = this.page.getByRole('textbox', { name: 'Desde' });
      await expect(desdeInput).toBeVisible();
      await desdeInput.fill(fechaDesde);
    }
    
    if (fechaHasta) {
      const hastaInput = this.page.getByRole('textbox', { name: 'Hasta' });
      await expect(hastaInput).toBeVisible();
      await hastaInput.fill(fechaHasta);
    }
    
    const buscarBtn = this.page.getByRole('button', { name: 'Buscar' });
    await expect(buscarBtn).toBeVisible();
    await buscarBtn.click();
  }
}

