import { Page } from "@playwright/test";
import { capturarPaso } from "./capturas";

export async function piboxDashboard(
  page: Page,
  nombreCaptura: string = "pibox_dashboard",
  carpeta: string = "pibox"
): Promise<void> {
  const pibox = page.getByRole("link", { name: "pibox Pibox Dashboard" });
  await pibox.waitFor({ state: "visible", timeout: 10000 });
  await pibox.click();

  // Captura después del clic
  await capturarPaso(page, nombreCaptura, carpeta);
}
