

# Servify – Proyecto TFG 2025

Aplicación web de reservas de servicios locales, desarrollada con Next.js 15, Prisma y MySQL en la nube. Permite a usuarios registrarse como clientes o proveedores, crear y buscar servicios, y gestionar reservas.
https://tfg-servify.vercel.app/

## 🚀 Tecnologías

- Next.js 15 (App Router)
- TailwindCSS + shadcn/ui
- Prisma ORM
- Railway (MySQL)
- JWT (autenticación)
- Vercel (despliegue)

## Funcionalidades principales

- Registro y login con roles (CLIENTE / PROVEEDOR)
- Panel de proveedor: creación y gestión de servicios
- Buscador con filtros (tipo, precio, etc.)
- Sistema de reservas reales
- Panel de perfil con información personalizada

## 🌐 Enlace en producción

🔗 https://tfg-servify.vercel.app

## 📦 Estructura del proyecto
![Modelo ER](./assets/Untitled.pdf)


## 🛠️ Instalación

```bash
git clone https://github.com/MateuCarbonell/TFG_Servify.git
cd TFG_Servify
npm install
npx prisma generate
npx prisma db push
npm run dev


---

## 📘 2. Modelo Entidad-Relación (ER)
---


### 📐 Entidades y relaciones:

#### 🔹 `User`
- `id` (PK)
- `name`
- `email` (UNIQUE)
- `password`
- `role` (`CLIENTE` | `PROVEEDOR`)
- `createdAt`
- `updatedAt`

#### 🔹 `Service`
- `id` (PK)
- `title`
- `description`
- `price`
- `location`
- `type` (categoría)
- `availability` (JSON)
- `providerId` (FK → User.id)
- `createdAt`
- `updatedAt`

🔁 Relación: **1 proveedor → N servicios**

#### 🔹 `Reservation`
- `id` (PK)
- `date`
- `userId` (FK → User.id)
- `serviceId` (FK → Service.id)
- `status` (`PENDING` | `CONFIRMED` | `CANCELLED`)
- `createdAt`

🔁 Relaciones:
- **1 cliente → N reservas**
- **1 servicio → N reservas**

