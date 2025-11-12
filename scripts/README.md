# 🤖 Auto-Explorer - Exploración Automática con IA

Sistema de exploración automática que detecta módulos no automatizados y genera tests.

## 🎯 ¿Qué Hace?

1. **Explora** toda la aplicación automáticamente
2. **Detecta** todos los módulos y submódulos
3. **Compara** con tests existentes
4. **Identifica** qué falta automatizar
5. **Genera** tests automáticamente para lo que falta

---

## 🚀 Uso

### Modo Exploración (solo detecta)
```bash
node scripts/explorer.js
```

Esto te muestra:
- ✅ Todos los módulos encontrados
- ✅ Qué módulos están automatizados
- ❌ Qué módulos NO están automatizados
- 📊 Porcentaje de cobertura

### Modo Generación (crea tests automáticamente)
```bash
node scripts/explorer.js --generate
```

Esto además:
- 🤖 Genera tests automáticamente para módulos faltantes
- 📁 Los guarda en `tests/generated/`
- ✨ Usa estructura BDD completa
- 📝 Comentarios profesionales

---

## 📊 Ejemplo de Output

```
🤖 AUTO-EXPLORER & TEST GENERATOR

🔐 Haciendo login...
✅ Login exitoso

🔍 Explorando módulos principales...
✅ Menú lateral abierto
📊 Encontrados 45 elementos en menú

📋 Módulos principales: 13
- Marketing y growth
- Servicios
- Picash
- Onboarding
- ...

🔎 Explorando submódulos...
   ✅ Marketing: 17 submódulos
   ✅ Servicios: 5 submódulos
   ✅ Picash: 15 submódulos
   ...

📊 Tests existentes: 47

⚠️  Módulos SIN automatizar: 5
   1. Marketing → Dashboard analítico
   2. Picash → Retiros Nequi
   3. ...

💡 Para generar tests: node scripts/explorer.js --generate
```

---

## 🤖 Generación Automática

Cuando ejecutas con `--generate`, crea:

```typescript
/**
 * Test: Validación de Marketing - Dashboard analítico
 * 
 * 🤖 GENERADO AUTOMÁTICAMENTE por explorer.js
 * 
 * Valida: Acceso a Dashboard analítico
 * Flujo: Login → Menú → Marketing → Dashboard analítico
 */

import { test, expect } from '../../fixtures/pages';
import { users } from '../../config/environments';

test.describe('Validación de Marketing', () => {
  test('Acceder a Dashboard analítico', async ({ 
    loginPage, 
    navigationPage,
    page 
  }, testInfo) => {
    // Test completo generado automáticamente...
  });
});
```

---

## 📁 Archivos Generados

Los tests generados van a:
```
tests/generated/
├── dashboardanalitico.spec.ts
├── retirosnequi.spec.ts
└── ...
```

Luego puedes:
1. Revisar los tests generados
2. Ajustarlos si es necesario
3. Moverlos a la carpeta correcta del módulo
4. Crear Page Objects específicos si hacen falta

---

## 🎯 Ventajas

✅ **Encuentra gaps automáticamente** - No olvidas módulos  
✅ **Ahorra tiempo** - Genera estructura base  
✅ **Mantiene consistencia** - Usa mismo patrón BDD  
✅ **Actualizable** - Re-ejecuta para detectar nuevos módulos  

---

## 🔧 Personalización

Edita `explorer.js` para:
- Cambiar selectores de exploración
- Modificar template de tests generados
- Ajustar lógica de comparación
- Agregar más validaciones

---

## 📊 Reporte de Exploración

Se guarda en: `scripts/exploration-report.json`

```json
[
  {
    "name": "Marketing y growth",
    "submodules": [
      { "text": "Dashboard", "href": "/dashboard" },
      { "text": "Campañas", "href": "/campaigns" },
      ...
    ]
  },
  ...
]
```

---

**Úsalo periódicamente** para mantener cobertura de tests al 100%

