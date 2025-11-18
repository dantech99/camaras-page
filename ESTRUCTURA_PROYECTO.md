# 📁 Estructura del Proyecto - Camaras Page

Este documento describe la estructura completa del proyecto, los módulos de frontend y backend, y cómo se conectan entre sí.

## 🏗️ Arquitectura General

Este es un **monorepo** usando **Turborepo** y **Bun** como package manager. La estructura está organizada en:

```
camaras-page/
├── apps/              # Aplicaciones principales
│   ├── web/          # Frontend (Next.js)
│   └── backend-worker/  # Backend (Elysia)
├── packages/         # Módulos compartidos
│   ├── api/          # Lógica de API/Backend
│   ├── auth/         # Sistema de autenticación
│   ├── database/     # Prisma ORM y esquema
│   ├── ui/           # Componentes UI compartidos
│   ├── s3/           # Servicio de almacenamiento S3
│   └── typescript-config/  # Configuraciones TypeScript
```

---

## 🎨 FRONTEND (`apps/web`)

### Estructura de Carpetas

```
apps/web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Rutas de autenticación
│   │   │   └── auth/
│   │   ├── (private)/          # Rutas privadas (requieren autenticación)
│   │   │   └── (staff)/        # Rutas de staff (admin/photographer)
│   │   ├── (public)/           # Rutas públicas
│   │   ├── layout.tsx          # Layout principal
│   │   └── providers.tsx       # Providers de React Query, etc.
│   │
│   ├── modules/                # Módulos de la aplicación
│   │   ├── agenda/             # Flujo de agendamiento
│   │   │   ├── select-package.tsx
│   │   │   ├── select-photographer.tsx
│   │   │   ├── select-day.tsx
│   │   │   ├── select-payment-method.tsx
│   │   │   ├── user-data.tsx
│   │   │   ├── confirm-payment.tsx
│   │   │   └── store/          # Estado con Zustand
│   │   │
│   │   ├── auth/               # Autenticación
│   │   │   ├── auth-screen.tsx
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   │
│   │   ├── dashboard/          # Paneles de administración
│   │   │   ├── admin/          # Panel de administrador
│   │   │   │   └── metricas/   # Gráficas y métricas
│   │   │   ├── cuenta/         # Gestión de cuenta
│   │   │   ├── cupones/        # Gestión de cupones
│   │   │   ├── horarios/       # Gestión de horarios
│   │   │   ├── paquetes/       # Gestión de paquetes
│   │   │   ├── users/          # Gestión de usuarios
│   │   │   ├── ventas/         # Gestión de ventas
│   │   │   ├── metricas/       # Métricas del fotógrafo
│   │   │   └── sidebar/        # Navegación lateral
│   │   │
│   │   ├── global/             # Componentes globales
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── home-screen.tsx
│   │   │
│   │   └── landing/            # Página de inicio pública
│   │       ├── hero.tsx
│   │       ├── about-section.tsx
│   │       ├── photographer-landing.tsx
│   │       └── ...
│   │
│   ├── services/               # Servicios de API
│   │   ├── package-service.ts
│   │   ├── photographer-service.ts
│   │   ├── sale-service.ts
│   │   ├── day-service.ts
│   │   ├── time-service.ts
│   │   ├── coupon-service.ts
│   │   ├── profile-service.ts
│   │   └── users-service.ts
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── use-packages.tsx
│   │   ├── use-photographers.tsx
│   │   ├── use-sale.tsx
│   │   ├── use-profile.tsx
│   │   └── ...
│   │
│   ├── utils/                  # Utilidades
│   │   ├── api-connection.ts   # Cliente de API (Eden Treaty)
│   │   ├── auth-connection.ts  # Cliente de autenticación
│   │   └── ...
│   │
│   └── middleware.ts           # Middleware de Next.js (protección de rutas)
│
└── public/                     # Archivos estáticos
    └── images/                 # Imágenes del sitio
```

### Módulos Principales del Frontend

#### 1. **Módulo de Agenda** (`modules/agenda/`)
- Flujo de agendamiento paso a paso (stepper)
- Selección de paquete, fotógrafo, día y método de pago
- Gestión del estado con Zustand (`store/sale.store.ts`)

#### 2. **Módulo de Dashboard** (`modules/dashboard/`)
- **Admin Dashboard**: Métricas generales, gestión de usuarios, cupones
- **Photographer Dashboard**: Métricas personales, gestión de paquetes, horarios, ventas
- **Cuenta**: Edición de perfil del usuario

#### 3. **Módulo de Autenticación** (`modules/auth/`)
- Login y registro de usuarios
- Integración con Better Auth

#### 4. **Módulo Landing** (`modules/landing/`)
- Página pública de inicio
- Galería de fotógrafos
- Testimonios
- Sección de FAQ

---

## ⚙️ BACKEND

### 1. Backend Worker (`apps/backend-worker/`)

**Propósito**: Servidor principal que ejecuta la API

```typescript
// apps/backend-worker/src/index.ts
import { api } from "@camaras/api/src";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(api)                    // Usa la API definida en packages/api
  .use(swagger({ path: "/api/swagger" }))
  .listen(8080);
```

**Puerto**: `8080`
**Framework**: Elysia.js
**Documentación**: Swagger en `/api/swagger`

---

### 2. Package API (`packages/api/`)

**Propósito**: Define toda la lógica del backend, rutas y endpoints

```
packages/api/
├── src/
│   ├── index.ts                # Exporta la API principal
│   │
│   ├── modules/                # Módulos del backend
│   │   ├── packages/           # Gestión de paquetes
│   │   │   ├── packages.route.ts    # Rutas HTTP
│   │   │   ├── packages.module.ts   # Lógica de negocio 
│   │   │   └── packages.service.ts  # Servicios/Repositorios
│   │   │
│   │   ├── photographers/      # Gestión de fotógrafos
│   │   ├── sales/              # Gestión de ventas
│   │   ├── day/                # Gestión de días disponibles
│   │   ├── time/               # Gestión de slots de tiempo
│   │   ├── coupon/             # Gestión de cupones
│   │   ├── profile/            # Perfiles de usuario
│   │   ├── users/              # Gestión de usuarios
│   │   ├── otp/                # Códigos OTP (One-Time Password)
│   │   ├── permissions/        # Sistema de permisos
│   │   └── prisma/             # Configuración Prisma
│   │
│   ├── core/                   # Núcleo del sistema
│   │   └── auth/               # Middleware de autenticación
│   │
│   └── utils/
│       ├── betteAuthPlugin.ts  # Plugin de Better Auth para Elysia
│       └── envs.ts             # Variables de entorno
```

### Estructura de Módulos Backend

Cada módulo sigue el patrón **Route → Module → Service**:

```
modules/nombre-modulo/
├── nombre-modulo.route.ts      # Define las rutas HTTP (GET, POST, PATCH, DELETE)
├── nombre-modulo.module.ts     # Registra el módulo en Elysia y expone servicios
└── nombre-modulo.service.ts    # Lógica de negocio y acceso a base de datos
```

**Ejemplo - Módulo de Paquetes:**

```typescript
// packages.route.ts - Define las rutas
export const packagesRouter = new Elysia({ prefix: "/package" })
  .get("/", ({ packagePhotosService, user }) => ...)
  .post("/", ({ body, user, packagePhotosService }) => ...)
  .patch("/:id", ({ params, body, user }) => ...)
  .delete("/:id", ({ params, user }) => ...);

// packages.module.ts - Registra el servicio
export const packagePhotosModule = new Elysia()
  .decorate("packagePhotosService", new PackagePhotosService());

// packages.service.ts - Lógica de negocio
export class PackagePhotosService {
  async getPackagesFromPhotographer(photographerId: string) { ... }
  async createPackage(data, photographerId) { ... }
}
```

### Rutas Principales del Backend

Todas las rutas están bajo el prefijo `/api`:

- `/api/package` - Gestión de paquetes
- `/api/photographer` - Gestión de fotógrafos
- `/api/sale` - Gestión de ventas
- `/api/day` - Días disponibles
- `/api/time` - Slots de tiempo
- `/api/coupon` - Cupones
- `/api/profile` - Perfiles
- `/api/users` - Usuarios
- `/api/otp` - Códigos OTP

---

## 📦 PACKAGES COMPARTIDOS

### 1. `packages/database/`
- **Prisma ORM**: Esquema de base de datos
- **Migrations**: Historial de cambios en la base de datos
- **Generated Client**: Cliente Prisma generado

```
packages/database/
├── prisma/
│   ├── schema.prisma           # Esquema de la base de datos
│   └── migrations/             # Migraciones de Prisma
└── generated/                  # Cliente Prisma generado
```

### 2. `packages/auth/`
- **Better Auth**: Sistema de autenticación
- Clientes para React y vanilla JS
- Gestión de sesiones y permisos

```
packages/auth/
├── client/
│   ├── index.ts                # Cliente React
│   └── vanilla.ts              # Cliente vanilla (para middleware)
├── utils/
│   └── auth.ts                 # Configuración de Better Auth
└── permissons/
    └── permissons.ts           # Sistema de permisos
```

### 3. `packages/ui/`
- Componentes UI compartidos (probablemente Shadcn/ui)
- Componentes reutilizables para todo el proyecto

### 4. `packages/s3/`
- Servicio para subir archivos a AWS S3
- Gestión de imágenes

---

## 🔗 CÓMO SE CONECTAN FRONTEND Y BACKEND

### Flujo de Conexión

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Frontend      │         │   Backend API    │         │   Database      │
│  (Next.js)      │────────▶│   (Elysia)       │────────▶│   (Prisma)      │
│                 │         │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
        │                            │
        │                            │
        ▼                            ▼
  api-connection.ts          packages/api/
  (Eden Treaty)              (Rutas y lógica)
```

### 1. Conexión HTTP (Eden Treaty)

**Frontend → Backend**: El frontend usa **Eden Treaty** para llamadas tipadas a la API.

```typescript
// apps/web/src/utils/api-connection.ts
import type { Api } from "@camaras/api/src";  // Tipo exportado del backend
import { treaty } from "@elysiajs/eden";

export const apiClient = treaty<Api>(process.env.NEXT_PUBLIC_BACKEND_URL).api;
```

**Uso en Servicios del Frontend:**

```typescript
// apps/web/src/services/package-service.ts
import { apiClient } from "@/utils/api-connection";

export const PackageService = {
  getAll: async () => {
    const response = await apiClient.package.index.get({
      fetch: { credentials: "include" }
    });
    return response.data;
  },
  
  create: async (dto) => {
    const response = await apiClient.package.index.post(dto, {
      fetch: { credentials: "include" }
    });
    return response.data;
  }
};
```

**Ventajas de Eden Treaty:**
- ✅ Tipado end-to-end (TypeScript)
- ✅ Autocompletado de rutas
- ✅ Detección de errores en tiempo de compilación

### 2. Autenticación (Better Auth)

**Frontend → Backend**: Usa Better Auth para autenticación.

```typescript
// apps/web/src/utils/auth-connection.ts
import { authClient } from "@camaras/auth/client/index";

export const signInWithEmailAndPassword = async (email, password) => {
  const response = await authClient.signIn.email({ email, password });
  return response.data;
};
```

**Backend**: Better Auth está integrado como plugin en Elysia:

```typescript
// packages/api/src/utils/betteAuthPlugin.ts
// Configura Better Auth para Elysia

// packages/api/src/index.ts
.use(betterAuth)  // Habilita autenticación en todas las rutas
```

### 3. Protección de Rutas

**Frontend**: Middleware de Next.js protege rutas privadas:

```typescript
// apps/web/src/middleware.ts
export async function middleware(request: NextRequest) {
  const session = await authClientVanilla.getSession();
  const role = session?.data?.user?.role;
  
  // Redirige si no tiene permisos
  if (role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
```

**Backend**: Guards en las rutas protegen endpoints:

```typescript
// packages/api/src/modules/packages/packages.route.ts
.get("/", ({ user }) => ..., {
  photographer: true,  // Solo fotógrafos pueden acceder
})
.post("/", ({ body, user }) => ..., {
  photographer: true,
})
```

### 4. Acceso a Base de Datos

**Backend → Database**: Usa Prisma Client:

```typescript
// packages/api/src/modules/packages/packages.service.ts
import { prisma } from "@camaras/api/src/modules/prisma";

export class PackagePhotosService {
  async getPackagesFromPhotographer(id: string) {
    return await prisma.packagePhoto.findMany({
      where: { photographerId: id }
    });
  }
}
```

---

## 🔄 FLUJO COMPLETO DE UNA OPERACIÓN

### Ejemplo: Crear un Paquete (Frontend → Backend → Database)

1. **Frontend - Componente** (`modules/dashboard/paquetes/create-paquete-form.tsx`)
   ```typescript
   const { mutate } = useMutation({
     mutationFn: PackageService.create
   });
   ```

2. **Frontend - Servicio** (`services/package-service.ts`)
   ```typescript
   create: async (dto) => {
     return await apiClient.package.index.post(dto);
   }
   ```

3. **HTTP Request** → `POST http://localhost:8080/api/package`

4. **Backend - Ruta** (`packages/api/src/modules/packages/packages.route.ts`)
   ```typescript
   .post("/", ({ body, user, packagePhotosService }) => {
     return packagePhotosService.createPackage(body, user.id);
   }, { photographer: true })
   ```

5. **Backend - Servicio** (`packages/api/src/modules/packages/packages.service.ts`)
   ```typescript
   async createPackage(data, photographerId) {
     return await prisma.packagePhoto.create({
       data: { ...data, photographerId }
     });
   }
   ```

6. **Database** → Prisma ejecuta `INSERT INTO package_photo ...`

7. **Response** → Frontend recibe los datos y actualiza la UI

---

## 📋 RESUMEN DE DEPENDENCIAS

### Frontend depende de:
- `@camaras/api` - Para tipos y definición de API
- `@camaras/auth/client` - Cliente de autenticación
- `@camaras/ui` - Componentes UI compartidos

### Backend depende de:
- `@camaras/database` - Prisma Client
- `@camaras/auth` - Better Auth server
- `@camaras/s3` - Servicio de almacenamiento

### Ambos comparten:
- Tipos TypeScript
- Configuraciones comunes

---

## 🚀 COMANDOS ÚTILES

```bash
# Desarrollo (todos los servicios)
bun dev

# Solo frontend
bun --filter @camaras/web dev

# Solo backend
bun --filter @camaras/backend-worker dev

# Base de datos (Prisma)
bun prisma studio        # Abre Prisma Studio
bun prisma migrate dev   # Crea migración
bun prisma generate      # Genera Prisma Client
```

---

## 📝 NOTAS IMPORTANTES

1. **Monorepo**: Todo está en un solo repositorio, compartiendo código
2. **Tipado End-to-End**: TypeScript asegura tipos desde frontend hasta backend
3. **Better Auth**: Maneja autenticación, sesiones y permisos
4. **Elysia + Eden**: Framework rápido con tipado automático
5. **Next.js App Router**: Usa el nuevo sistema de routing de Next.js
6. **Prisma ORM**: Acceso tipado a la base de datos

---

## 🗺️ MAPA DE RUTAS

### Frontend (Next.js)
- `/` - Landing pública
- `/auth` - Login/Registro
- `/photographer/*` - Dashboard del fotógrafo (requiere rol)
- `/admin/*` - Dashboard del admin (requiere rol)
- `/agenda` - Flujo de agendamiento

### Backend (Elysia)
- `http://localhost:8080/api/*` - Todos los endpoints
- `http://localhost:8080/api/swagger` - Documentación Swagger

---

Este documento te ayudará a navegar por el proyecto y entender cómo se conectan todas las piezas. Si necesitas más detalles sobre algún módulo específico, puedes explorar los archivos mencionados.

