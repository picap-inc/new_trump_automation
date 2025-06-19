import { Page } from "@playwright/test";
import fs from "fs";

export async function capturarPaso(page: Page, nombre: string, carpeta: string = "default") {
  if (process.env.CI) return;

  const ruta = `screenshots/${carpeta}`;
  if (!fs.existsSync(ruta)) fs.mkdirSync(ruta, { recursive: true });

  await page.screenshot({
    path: `${ruta}/${nombre}.png`,
    fullPage: true,
  });
}
