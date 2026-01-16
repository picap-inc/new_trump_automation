import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { testConfig } from '../config/test-config';

/**
 * TrumpPage - Módulo TRUMP (Pilot Safe)
 */
export class TrumpPage extends BasePage {
  private readonly trumpModule: Locator;
  private readonly pilotSafeLink: Locator;
  private readonly usuariosRolesLink: Locator;
  private readonly paisSelect: Locator;
  private readonly estadoSelect: Locator;
  private readonly tipoServicioSelect: Locator;
  private readonly buscarButton: Locator;
  private readonly limpiarButton: Locator;

  constructor(page: Page) {
    super(page);
    this.trumpModule = this.sideNav.getByText('TRUMP', { exact: true });
    this.pilotSafeLink = this.sideNav.getByRole('link', { name: /Pilot Safe/i });
    this.usuariosRolesLink = this.sideNav.getByRole('link', { name: /Usuarios\/Roles/i });
    this.paisSelect = page.locator('#country, #country_id').first();
    this.estadoSelect = page.locator('#state, #state_id').first();
    this.tipoServicioSelect = page.locator('#service_type, #service_type_id').first();
    this.buscarButton = page.getByRole('button', { name: 'Buscar' });
    this.limpiarButton = page.getByRole('button', { name: 'Limpiar' });
  }

  private async resolveSelectByLabel(label: string, fallback: Locator): Promise<Locator> {
    if (await fallback.isVisible().catch(() => false)) {
      return fallback;
    }
    return this.page.getByLabel(label);
  }

  async navigateToTrump(): Promise<void> {
    await expect(this.trumpModule).toBeVisible({ timeout: testConfig.timeouts.medium });
    await this.clickElement(this.trumpModule);
    await expect(this.pilotSafeLink).toBeVisible({ timeout: testConfig.timeouts.medium });
  }

  async navigateToPilotSafe(): Promise<void> {
    await this.clickAndWaitForURL(this.pilotSafeLink, /\/pilot_safe/i);
  }

  async navigateToUsuariosRoles(): Promise<void> {
    await this.clickAndWaitForURL(this.usuariosRolesLink, /\/usuarios-roles/);
  }

  async applyFilters(pais: string, estado: string, tipoServicio: string): Promise<void> {
    const paisSelect = await this.resolveSelectByLabel('País', this.paisSelect);
    const estadoSelect = await this.resolveSelectByLabel('Estado', this.estadoSelect);
    const tipoSelect = await this.resolveSelectByLabel('Tipos de servicio', this.tipoServicioSelect);

    await paisSelect.selectOption(pais);
    await estadoSelect.selectOption(estado);
    await tipoSelect.selectOption(tipoServicio);
    
    await this.clickElement(this.buscarButton);
    const resultsRow = this.page.locator('table tbody tr').first();
    const emptyState = this.page.getByText(/sin resultados|no hay resultados|no records|no data/i);

    await this.waitHelpers.waitWithRetry(async () => {
      await Promise.any([
        expect(resultsRow).toBeVisible({ timeout: testConfig.timeouts.long }),
        expect(emptyState).toBeVisible({ timeout: testConfig.timeouts.long })
      ]);
    }, 2);
  }

  async clearFilters(): Promise<void> {
    await this.clickElement(this.limpiarButton);
  }
}

