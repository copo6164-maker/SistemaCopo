# SistemaCopo

Sistema web para la gestión de requisiciones y pendientes del proyecto **SistemaCopo / COPO**.

## Descripción

SistemaCopo permite registrar, consultar y dar seguimiento a requisiciones. El sistema usa Firebase para autenticación y base de datos, y está preparado para publicarse gratis con GitHub Pages.

## Funciones principales

- Inicio de sesión con Firebase Authentication.
- Protección de páginas para usuarios autenticados.
- Registro de requisiciones en Firestore.
- Búsqueda por folio, concepto, área y artículo.
- Filtros por departamento, área, cotización y tipo de compra.
- Edición de requisiciones existentes.
- Eliminación de requisiciones.
- Marcado de requisiciones como listas/completadas.
- Generación de archivo Excel con la plantilla oficial.
- Vista de impresión de requisición.
- Dashboard con indicadores y gráficas.

## Estructura del proyecto

```text
sistemaCopo
├── index.html                  # Redirección al login para GitHub Pages
├── .nojekyll                   # Evita problemas de rutas en GitHub Pages
├── .gitignore                  # Archivos que no deben subirse
├── README.md                   # Descripción del proyecto
├── assets
│   ├── img
│   │   └── logoCopo.png
│   └── templates
│       └── Req. Base Mazatlán.xlsx
├── css
│   └── style.css
└── html
    ├── login.html
    ├── index.html
    └── pendientes.html
```

## Tecnologías usadas

- HTML
- CSS
- JavaScript
- Firebase Authentication
- Firebase Firestore
- Chart.js
- GitHub Pages

## Uso

1. Abrir el enlace publicado en GitHub Pages.
2. Iniciar sesión con un usuario registrado en Firebase Authentication.
3. Entrar al Dashboard o a Pendientes Generales.
4. Crear, buscar, filtrar, editar, eliminar o imprimir requisiciones.
5. Generar el Excel de la requisición cuando sea necesario.

## Seguridad

Firestore debe mantenerse protegido con reglas que permitan lectura y escritura solo a usuarios autenticados:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /tareas/{documento} {
      allow read, create, update, delete: if request.auth != null;
    }
  }
}
```

## Publicación

El proyecto está preparado para GitHub Pages desde la rama principal y la raíz del repositorio.

El archivo raíz `index.html` redirige automáticamente a:

```text
html/login.html
```

## Notas

- No eliminar el archivo `.nojekyll`.
- No eliminar la plantilla `Req. Base Mazatlán.xlsx`.
- No subir archivos de depuración como `firebase-debug.log`.
- Después de cada cambio importante, subir a GitHub con:

```bash
git add .
git commit -m "Descripcion del cambio"
git push
```
