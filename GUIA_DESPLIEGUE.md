# 🚀 Guía de Despliegue - Monorepo Camaras Page

Esta guía te ayudará a desplegar tu monorepo en producción. El proyecto consta de:
- **Frontend**: Next.js (`apps/web`)
- **Backend**: Elysia (`apps/backend-worker`)
- **Base de datos**: PostgreSQL con Prisma

---

## 📋 Tabla de Contenidos

1. [Variables de Entorno](#variables-de-entorno)
2. [Opciones de Despliegue](#opciones-de-despliegue)
3. [Despliegue en Vercel (Frontend)](#despliegue-en-vercel-frontend)
4. [Despliegue del Backend](#despliegue-del-backend)
5. [Despliegue con Docker](#despliegue-con-docker)
6. [Despliegue Manual](#despliegue-manual)

---

## 🔐 Variables de Entorno

### Variables Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Entorno
NODE_ENV=production

# Base de datos (PostgreSQL)
DATABASE_URL=postgresql://usuario:password@host:puerto/database?schema=public

# Autenticación
AUTH_SECRET=tu-secret-key-super-segura-aqui

# URLs públicas
NEXT_PUBLIC_BACKEND_URL=https://tu-backend.com
NEXT_PUBLIC_FRONTEND_URL=https://tu-frontend.com

# Twilio (opcional - para OTP)
TWILIO_SID=tu-twilio-account-sid
TWILIO_AUTH=tu-twilio-auth-token
TWILIO_VERIFY_SERVICE_SID=tu-twilio-verify-service-sid

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
```

### Generar AUTH_SECRET

Puedes generar un `AUTH_SECRET` seguro ejecutando:

```bash
bun -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

---

## 🎯 Opciones de Despliegue

### Opción 1: Vercel (Frontend) + Railway/Render (Backend) ⭐ Recomendado
- **Frontend**: Vercel (optimizado para Next.js)
- **Backend**: Railway o Render (soporte para Bun)
- **Base de datos**: Supabase, Neon, o Railway PostgreSQL

### Opción 2: Docker Compose (Todo en un servidor)
- Despliega todo en un VPS usando Docker
- Requiere un servidor con Docker instalado

### Opción 3: Despliegue Manual
- Construcción y ejecución manual en servidor

---

## 🌐 Despliegue en Vercel (Frontend)

### Paso 1: Preparar el Proyecto

1. **Asegúrate de tener un script de build en el package.json raíz** (ya lo tienes: `"build": "turbo build"`)

2. **Configura el archivo `vercel.json` en la raíz**:

```json
{
  "buildCommand": "bun run build",
  "outputDirectory": "apps/web/.next",
  "installCommand": "bun install",
  "framework": "nextjs",
  "projectSettings": {
    "buildCommand": "cd apps/web && bun run build"
  }
}
```

### Paso 2: Desplegar en Vercel

1. **Instala Vercel CLI** (opcional, también puedes usar la interfaz web):
```bash
bun add -g vercel
```

2. **Inicia sesión en Vercel**:
```bash
vercel login
```

3. **Despliega el proyecto**:
```bash
vercel
```

4. **Configura las variables de entorno en Vercel**:
   - Ve a tu proyecto en Vercel Dashboard
   - Settings → Environment Variables
   - Agrega todas las variables de entorno necesarias

### Paso 3: Configurar Vercel para Monorepo

En el dashboard de Vercel:
- **Root Directory**: Deja vacío (raíz del proyecto)
- **Build Command**: `cd apps/web && bun run build`
- **Output Directory**: `apps/web/.next`
- **Install Command**: `bun install`

### Variables de Entorno en Vercel

Asegúrate de configurar estas variables en Vercel:
- `NEXT_PUBLIC_BACKEND_URL` (URL de tu backend en producción)
- `NEXT_PUBLIC_FRONTEND_URL` (URL de tu frontend en Vercel)
- `DATABASE_URL` (si Next.js necesita acceso directo)
- `AUTH_SECRET` (mismo valor que en el backend)

---

## ⚙️ Despliegue del Backend

### Opción A: Railway (Recomendado para Bun)

1. **Crea una cuenta en [Railway](https://railway.app)**

2. **Conecta tu repositorio**:
   - New Project → Deploy from GitHub repo
   - Selecciona tu repositorio

3. **Configura el servicio**:
   - **Root Directory**: Deja vacío
   - **Build Command**: `bun install && bun run build`
   - **Start Command**: `bun run apps/backend-worker/src/index.ts`
   - **Port**: `8080`

4. **Agrega variables de entorno** en Railway:
   - Todas las variables del `.env.local`

5. **Agrega PostgreSQL**:
   - Railway → New → Database → PostgreSQL
   - Copia la `DATABASE_URL` generada

6. **Ejecuta migraciones de Prisma**:
   - En Railway, agrega un script de inicio:
   ```bash
   bun run prisma migrate deploy
   ```

### Opción B: Render

1. **Crea una cuenta en [Render](https://render.com)**

2. **Nuevo Web Service**:
   - Conecta tu repositorio de GitHub
   - **Build Command**: `bun install && bun run build`
   - **Start Command**: `bun run apps/backend-worker/src/index.ts`
   - **Environment**: `Node`

3. **Configura variables de entorno** en Render

4. **Agrega PostgreSQL**:
   - Render → New → PostgreSQL
   - Usa la `DATABASE_URL` proporcionada

### Opción C: Fly.io

1. **Instala Fly CLI**:
```bash
bun add -g @fly/cli
```

2. **Inicia sesión**:
```bash
fly auth login
```

3. **Crea la app**:
```bash
fly launch
```

4. **Configura el `fly.toml`** (se genera automáticamente)

---

## 🐳 Despliegue con Docker

### Crear Dockerfiles

#### 1. Dockerfile para Backend

Crea `apps/backend-worker/Dockerfile`:

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Instalar dependencias
COPY package.json bun.lock ./
COPY apps/backend-worker/package.json ./apps/backend-worker/
COPY packages ./packages
RUN bun install --frozen-lockfile

# Copiar código
COPY . .

# Generar Prisma Client
RUN bun run --filter @camaras/database prisma generate

# Ejecutar migraciones (opcional, mejor hacerlo manualmente)
# RUN bun run --filter @camaras/database prisma migrate deploy

# Exponer puerto
EXPOSE 8080

# Comando de inicio
CMD ["bun", "run", "apps/backend-worker/src/index.ts"]
```

#### 2. Dockerfile para Frontend

Crea `apps/web/Dockerfile`:

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Instalar dependencias
COPY package.json bun.lock ./
COPY apps/web/package.json ./apps/web/
COPY packages ./packages
RUN bun install --frozen-lockfile

# Copiar código
COPY . .

# Build
RUN bun run build

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["bun", "run", "apps/web/start"]
```

#### 3. Docker Compose

Crea `docker-compose.yml` en la raíz:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: camaras
      POSTGRES_PASSWORD: password
      POSTGRES_DB: camaras_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build:
      context: .
      dockerfile: apps/backend-worker/Dockerfile
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://camaras:password@postgres:5432/camaras_db
      - AUTH_SECRET=${AUTH_SECRET}
      - NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
      - NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
    depends_on:
      - postgres
    command: >
      sh -c "bun run --filter @camaras/database prisma migrate deploy &&
             bun run apps/backend-worker/src/index.ts"

  frontend:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
      - NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Desplegar con Docker

1. **Construir y ejecutar**:
```bash
docker-compose up -d
```

2. **Ver logs**:
```bash
docker-compose logs -f
```

3. **Detener**:
```bash
docker-compose down
```

---

## 🔧 Despliegue Manual

### Paso 1: Preparar el Servidor

```bash
# Instalar Bun
curl -fsSL https://bun.sh/install | bash

# Clonar repositorio
git clone tu-repositorio
cd camaras-page

# Instalar dependencias
bun install
```

### Paso 2: Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar con tus valores
nano .env.local
```

### Paso 3: Configurar Base de Datos

```bash
# Ejecutar migraciones
bun run prisma migrate deploy

# Generar Prisma Client
bun run --filter @camaras/database prisma generate
```

### Paso 4: Construir Aplicaciones

```bash
# Construir todo el monorepo
bun run build
```

### Paso 5: Ejecutar en Producción

#### Backend (con PM2 o similar)

```bash
# Instalar PM2
bun add -g pm2

# Iniciar backend
pm2 start "bun run apps/backend-worker/src/index.ts" --name backend

# Guardar configuración
pm2 save
pm2 startup
```

#### Frontend

```bash
# Iniciar frontend
cd apps/web
bun run start

# O con PM2
pm2 start "bun run apps/web/start" --name frontend
```

### Paso 6: Configurar Nginx (Opcional)

Crea `/etc/nginx/sites-available/camaras-page`:

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Habilita el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/camaras-page /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📝 Checklist de Despliegue

### Antes de Desplegar

- [ ] Variables de entorno configuradas
- [ ] Base de datos creada y accesible
- [ ] Migraciones de Prisma ejecutadas
- [ ] `AUTH_SECRET` generado y configurado
- [ ] URLs públicas configuradas correctamente
- [ ] CORS configurado (si es necesario)

### Después de Desplegar

- [ ] Frontend accesible en la URL configurada
- [ ] Backend respondiendo en `/api`
- [ ] Swagger accesible en `/api/swagger`
- [ ] Autenticación funcionando
- [ ] Base de datos conectada
- [ ] Logs sin errores críticos

---

## 🔍 Solución de Problemas

### Error: "Cannot find module"

```bash
# Reinstalar dependencias
rm -rf node_modules
bun install
```

### Error: "Prisma Client not generated"

```bash
bun run --filter @camaras/database prisma generate
```

### Error: "Database connection failed"

- Verifica que `DATABASE_URL` sea correcta
- Asegúrate de que la base de datos esté accesible desde tu servidor
- Verifica firewall/security groups

### Error: "Port already in use"

```bash
# Encontrar proceso usando el puerto
lsof -i :8080  # Backend
lsof -i :3000  # Frontend

# Matar proceso
kill -9 <PID>
```

---

## 📚 Recursos Adicionales

- [Documentación de Turborepo](https://turbo.build/repo/docs)
- [Documentación de Bun](https://bun.sh/docs)
- [Documentación de Next.js Deployment](https://nextjs.org/docs/deployment)
- [Documentación de Elysia](https://elysiajs.com)
- [Documentación de Prisma](https://www.prisma.io/docs)

---

## 💡 Tips de Producción

1. **Usa un CDN** para assets estáticos
2. **Habilita HTTPS** con Let's Encrypt
3. **Configura backups** de la base de datos
4. **Monitorea logs** con servicios como Logtail o Datadog
5. **Usa variables de entorno** para diferentes ambientes (dev, staging, prod)
6. **Configura rate limiting** en el backend
7. **Habilita CORS** correctamente para producción

---

¿Necesitas ayuda con algún paso específico? Revisa la documentación o abre un issue en el repositorio.

