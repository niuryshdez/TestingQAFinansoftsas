# TestingQA Finansoftsas — Suite E2E

Suite de pruebas automatizadas de extremo a extremo para el sistema **Y2K de FinansoftSAS**, cubriendo los módulos de autenticación y recuperación de contraseña.

- **Sistema bajo prueba:** `https://y2k.finansoftsas.ec/smagfe/#/`
- **Framework:** [Cypress](https://www.cypress.io/) v15.9
- **Tecnología de la app:** Angular (enrutamiento con hash `#/`)

---

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

---

## Instalación

```bash
npm install
```

---

## Ejecución de pruebas

| Comando | Descripción |
|---|---|
| `npm run cy:open` | Abre la interfaz gráfica de Cypress (modo desarrollo) |
| `npm test` | Ejecuta toda la suite en modo headless |
| `npm run test:login` | Solo el módulo de inicio de sesión |
| `npm run test:password` | Solo el módulo de restablecimiento de contraseña |
| `npm run test:headed` | Toda la suite con navegador visible |
| `npm run test:chrome` | Toda la suite en Chrome |

---

## Estructura del proyecto

```
cypress/
├── e2e/
│   ├── 1-inicio-sesion/           # Módulo de login (4 casos)
│   └── 2-restablecer-contrasena/  # Módulo de recuperación (7 casos)
├── fixtures/                       # Datos de prueba
└── support/
    ├── commands.js                 # Comandos personalizados de Cypress
    └── e2e.js                      # Configuración global y hooks
cypress.config.js
```

---

## Casos de prueba

### Módulo 1 — Inicio de sesión

| Archivo | Descripción |
|---|---|
| `inicio-sesion-exitoso.cy.js` | Credenciales válidas → redirección al dashboard |
| `ingreso-credenciales-invalidas.cy.js` | Credenciales inválidas → mensaje de error |
| `tolerar-espaciosen-blanco.cy.js` | Espacios al inicio/fin del usuario son ignorados |
| `restriccion-dashboard-urldirecta.cy.js` | Acceso directo por URL sin sesión activa es bloqueado |

### Módulo 2 — Restablecimiento de contraseña

| Archivo | Descripción |
|---|---|
| `olvide-contrasena-visible.cy.js` | El enlace "Olvidé mi contraseña" es visible en login |
| `olvide-contrasena-formulario.cy.js` | El formulario se muestra al hacer clic en el enlace |
| `cambio-contrasena-exitosa.cy.js` | Flujo completo: solicitud → enlace por API → nueva contraseña |
| `formato-correo-invalido.cy.js` | Email con formato inválido es rechazado |
| `envio-enlace-email-vacio.cy.js` | Campo email vacío no envía el enlace |
| `enlace-reutilizado.cy.js` | Un enlace ya utilizado es rechazado |
| `acceso-formulario-enlace-vencido.cy.js` | Un enlace expirado o manipulado es rechazado |

---

## Notas importantes

- **Credenciales:** Los archivos de prueba usan valores enmascarados (`****`). Las credenciales reales deben configurarse antes de ejecutar. Se recomienda usar variables de entorno de Cypress (`cypress.env.json`, ignorado por git).
- **Tokens hardcodeados:** `enlace-reutilizado.cy.js` y `acceso-formulario-enlace-vencido.cy.js` usan tokens fijos que pueden expirar y requerir actualización manual.
- **Flujo de reset completo:** `cambio-contraseña-exitosa.cy.js` intercepta `POST /auth/auth/forgot` y extrae `resetLink` del cuerpo de respuesta para navegar al formulario de cambio sin depender del correo electrónico.
