# Descripción General del Proyecto "Cámaras del Dragon"

## Resumen Ejecutivo

"Cámaras del Dragon" es una plataforma web dedicada a la fotografía de cosplay y modelaje, específicamente enfocada en el evento "SOFA 2026". El proyecto permite a los usuarios reservar sesiones fotográficas con fotógrafos profesionales, mientras que los fotógrafos gestionan sus servicios, horarios y ventas a través de dashboards dedicados. Los administradores supervisan métricas globales y gestionan usuarios.

La aplicación está construida como un monorepo usando Turborepo, con arquitectura modular que incluye un frontend en Next.js, un backend en Elysia.js, y paquetes compartidos para UI, API, almacenamiento S3 y configuraciones TypeScript.

## Arquitectura Técnica

### Estructura del Monorepo

- **apps/web**: Aplicación frontend en Next.js 14+ con App Router, Tailwind CSS y componentes compartidos.
- **apps/backend-worker**: Servicio backend en Elysia.js que maneja la lógica de negocio y APIs REST.
- **packages/ui**: Biblioteca de componentes React compartida con componentes de Radix UI.
- **packages/api**: Capa de servicios API con Elysia.js y validación TypeBox.
- **packages/s3**: Utilidades para almacenamiento en S3 (compatible con Supabase).
- **packages/typescript-config**: Configuraciones TypeScript compartidas para consistencia.
- **packages/database**: Gestión de base de datos con Prisma.
- **packages/auth**: Autenticación con Better Auth.

### Tecnologías Principales

- **Frontend**: Next.js, React 19, Tailwind CSS, Framer Motion, React Query, Zustand.
- **Backend**: Elysia.js, Prisma, Better Auth, Supabase S3, Sharp, Twilio.
- **Herramientas**: Turborepo, TypeScript, Biome/Oxlint, Bun como package manager.

## Roles de Usuario

1. **Usuario Público**: Accede a páginas públicas, galería, contacto y flujo de reserva. No requiere login para funcionalidades básicas.
2. **Fotógrafo**: Gestiona paquetes, horarios, cupones, ventas y perfil. Accede a dashboard de fotógrafo.
3. **Administrador**: Supervisa métricas globales, gestiona usuarios y tiene acceso completo al sistema.

## Flujos de Usuario

### Flujo de Reserva (Usuario Público)

1. **Página Principal**: Visualiza hero con countdown a SOFA 2026, slider de imágenes, búsqueda de tickets, botones de contacto/agenda.
2. **Galería**: Explora fotos de fotógrafos.
3. **Agenda (Stepper)**:
   - Paso 1: Seleccionar fotógrafo.
   - Paso 2: Elegir paquete.
   - Paso 3: Seleccionar día y horario.
   - Paso 4: Método de pago.
   - Paso 5: Datos del comprador.
   - Confirmación final.
4. **Contacto**: Formulario de contacto.

### Flujo de Autenticación

- **Login/Registro**: En `/auth`, con email/password y Google OAuth.
- Redirección basada en rol: Admins a `/admin`, Fotógrafos a `/photographer`.
- Middleware asegura acceso basado en roles.

### Flujo de Fotógrafo

1. **Dashboard Principal**: Métricas de ventas (pendiente de implementación).
2. **Ventas**: Tabla de órdenes, confirmar pagos, cancelar, marcar no-show.
3. **Paquetes**: CRUD de paquetes con imágenes (comprimidas a WebP).
4. **Horarios**: Gestionar días disponibles y slots de tiempo.
5. **Cupones**: Crear y gestionar descuentos.
6. **Perfil**: Actualizar info personal, redes sociales, foto de perfil.
7. **Cuenta**: Configuración de cuenta.

### Flujo de Administrador

1. **Dashboard Principal**: Métricas con gráficos de paquetes, ingresos, clientes.
2. **Usuarios**: Tabla para gestionar roles de usuarios.
3. **Perfil/Cuenta**: Configuración personal.

## Pantallas y Rutas

### Rutas Públicas (`(public)`)

- **/** (Homepage):

  - Hero con background slider, countdown, overlay con botones.
  - Secciones: Galería, Acerca de, Equipo, Agenda, FAQ.
  - Layout responsive con gradientes cyan/white.

- **/agenda**:

  - Stepper multi-paso para reserva.
  - Formularios con validación y estado en Zustand.

- **/galeria**:

  - Galería de fotos en masonry layout.

- **/contacto**:

  - Formulario de contacto.

- **/nosotros**:
  - Página "Acerca de" con info del equipo.

### Rutas de Autenticación (`(auth)`)

- **/auth**:
  - Formulario de login con registro integrado.
  - Soporte para OAuth con Google.

### Rutas Privadas (`(private)/(staff)`)

#### Dashboard de Administrador (`/admin`)

- **/admin**: Dashboard con métricas (gráficos de paquetes, ingresos, clientes).
- **/admin/usuarios**: Tabla de usuarios con gestión de roles.
- **/admin/metricas**: Métricas detalladas.
- **/admin/perfil**: Configuración de perfil.
- **/admin/cuenta**: Gestión de cuenta.

#### Dashboard de Fotógrafo (`/photographer`)

- **/photographer**: Dashboard con métricas (pendiente).
- **/photographer/ventas**: Tabla de ventas con acciones (confirmar, pagar, cancelar, no-show).
- **/photographer/paquetes**: Gestión de paquetes (CRUD con upload de imágenes).
- **/photographer/horarios**: Gestión de días y slots de tiempo.
- **/photographer/cupones**: Gestión de cupones de descuento.
- **/photographer/perfil**: Perfil con actualización de info y redes sociales.
- **/photographer/cuenta**: Configuración de cuenta.

## Funcionalidades Clave

### Sistema de Reservas

- Stepper intuitivo para bookings.
- Validación de disponibilidad de fotógrafos.
- Integración con pagos (efectivo/Nequi).
- Aplicación de cupones de descuento.

### Gestión de Fotógrafos

- CRUD de paquetes con imágenes optimizadas.
- Calendario de disponibilidad con slots de tiempo.
- Gestión de ventas con estados (pendiente, completado, cancelado, parcial).
- Sistema de cupones para descuentos.

### Administración Global

- Dashboard con métricas agregadas.
- Gestión de roles de usuario.
- Supervisión de operaciones.

### Características Técnicas

- **Autenticación**: Role-based con Better Auth, sesiones seguras.
- **Almacenamiento**: Imágenes en S3 con compresión Sharp.
- **Notificaciones**: OTP por SMS (Twilio), toasts en frontend.
- **Validación**: TypeBox en backend, Zod en frontend.
- **Responsive**: Diseño mobile-first con Tailwind.
- **SEO/Performance**: Next.js con optimizaciones built-in.

## Modelo de Datos

- **User**: ID, rol, perfil.
- **Package**: Nombre, descripción, precio, cantidad de fotos, fotógrafo, imagen.
- **Sale**: Fotógrafo, paquete, día, slot, precio, descuento, método de pago, estado, datos del comprador.
- **AvailableDay**: Día disponible para un fotógrafo.
- **TimeSlot**: Slot de tiempo específico.
- **Discount**: Cupón con porcentaje de descuento.

## API Endpoints Principales

- `/api/users`: Gestión de usuarios (admin).
- `/api/photographer`: Listado y disponibilidad de fotógrafos.
- `/api/package`: CRUD de paquetes.
- `/api/sale`: Gestión de ventas/reservas.
- `/api/day`: Días disponibles.
- `/api/time`: Slots de tiempo.
- `/api/coupon`: Cupones de descuento.
- `/api/otp`: Envío y verificación de OTP.
- `/api/profile`: Gestión de perfiles.

## Integraciones

- **Base de Datos**: Prisma con PostgreSQL (asumido).
- **Almacenamiento**: Supabase S3 para imágenes.
- **Autenticación**: Better Auth con soporte OAuth.
- **Comunicaciones**: Twilio para SMS OTP.
- **Pagos**: Soporte para efectivo y Nequi.

## Consideraciones de Desarrollo

- **Seguridad**: Validación estricta, CORS configurado, secrets en env vars.
- **Performance**: Imágenes comprimidas, lazy loading, React Query para caching.
- **Accesibilidad**: Componentes de Radix UI con soporte ARIA.
- **Testing**: No configurado aún (Jest/Vitest recomendado).
- **Linting**: Oxlint con reglas personalizadas.

Este proyecto ofrece una solución completa para gestión de servicios fotográficos, con énfasis en experiencia de usuario y operaciones eficientes.</content>
<parameter name="filePath">D:\dev\camaras-page\project-overview.md
