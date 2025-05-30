# Servify – Proyecto TFG 2025

Aplicación web para la gestión y reserva de servicios locales, desarrollada con Next.js 15, Prisma y MySQL en la nube. Permite a los usuarios registrarse como **clientes** o **proveedores**, crear y buscar servicios, así como gestionar reservas de forma sencilla y eficiente.

🌐 [Accede a la aplicación en producción](https://tfg-servify.vercel.app/)

---

## 🚀 Tecnologías utilizadas

- **Next.js 15** (App Router)
- **TailwindCSS** + **shadcn/ui**
- **Prisma ORM**
- **MySQL** gestionado en Railway
- **JWT** para autenticación segura
- **Vercel** para despliegue continuo

---

## 🛠️ Funcionalidades principales

- Registro y autenticación con roles diferenciados: **CLIENTE** y **PROVEEDOR**
- Panel exclusivo para proveedores: creación, edición y gestión de servicios
- Buscador avanzado con filtros por tipo, precio, ubicación y más
- Sistema completo de reservas con estados personalizables (pendiente, confirmada, cancelada)
- Panel de usuario para gestionar perfil, reservas y valoraciones
- Sistema de valoraciones y comentarios para mejorar la confianza y calidad de los servicios

---

## 📁 Estructura del proyecto

### Modelo Entidad-Relación (ER)

![Modelo ER](https://github.com/user-attachments/assets/484a129d-c6b0-417c-b3b9-44f739f97b14)

---

## 📦 Instalación y ejecución local

```bash
git clone https://github.com/MateuCarbonell/TFG_Servify.git
cd TFG_Servify
npm install
npx prisma generate
npx prisma db push
npm run dev
```
---
## 🚢 Despliegue en producción

- **Frontend y API Routes:**  
  Despliegue automático mediante GitHub y Vercel.

- **Base de datos:**  
  MySQL gestionado en Railway.

- **Servidor VPS (opcional):**  
  VPS Ubuntu 24.04 LTS en Hostinger con despliegue manual:


# Modelo de datos

## Entidades principales

---

### User (Usuario)

| Campo      | Tipo           | Descripción                          |
|------------|----------------|------------------------------------|
| id         | PK             | Identificador único                 |
| name       | string         | Nombre completo                    |
| email      | string (UNIQUE)| Correo electrónico                 |
| password   | string         | Contraseña cifrada                  |
| role       | enum           | Rol: CLIENTE / PROVEEDOR           |
| createdAt  | timestamp      | Fecha de creación                  |
| updatedAt  | timestamp      | Fecha de última actualización     |

---

### Service (Servicio)

| Campo        | Tipo           | Descripción                             |
|--------------|----------------|---------------------------------------|
| id           | PK             | Identificador único                    |
| title        | string         | Nombre del servicio                    |
| description  | string         | Descripción detallada                  |
| price        | decimal        | Precio                                |
| location     | string         | Ubicación                             |
| type         | string         | Categoría o tipo                      |
| availability | JSON           | Horarios disponibles y días           |
| providerId   | FK → User.id   | Proveedor que ofrece el servicio      |
| createdAt    | timestamp      | Fecha de creación                     |
| updatedAt    | timestamp      | Fecha de actualización                |

**Relación:**  
Un proveedor puede ofrecer múltiples servicios (1:N).

---

### Reservation (Reserva)

| Campo      | Tipo           | Descripción                                |
|------------|----------------|--------------------------------------------|
| id         | PK             | Identificador único                         |
| date       | datetime       | Fecha y hora de la reserva                  |
| userId     | FK → User.id   | Cliente que realiza la reserva              |
| serviceId  | FK → Service.id| Servicio reservado                          |
| status     | enum           | Estado: PENDING, CONFIRMED, CANCELLED      |
| createdAt  | timestamp      | Fecha de creación                           |

**Relaciones:**  
- Un cliente puede tener múltiples reservas (1:N).  
- Un servicio puede estar reservado en múltiples ocasiones (1:N).

---

### Review (Reseña)

| Campo      | Tipo           | Descripción                              |
|------------|----------------|----------------------------------------|
| id         | PK             | Identificador único                     |
| rating     | int            | Puntuación otorgada                     |
| comment    | string         | Comentarios del usuario                 |
| serviceId  | FK → Service.id| Servicio evaluado                       |
| userId     | FK → User.id   | Usuario que realiza la valoración       |
| createdAt  | timestamp      | Fecha de creación                      |

**Restricción:**  
Cada usuario puede dejar una única reseña por servicio (clave única compuesta).
