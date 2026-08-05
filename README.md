# Medical Scheduling Platform - Web Client

Single Page Application (SPA) consuming the Medical Scheduling Platform REST API. Implements component-based architecture with custom hooks to decouple business logic from UI, supporting multi-role workflows and real-time appointment scheduling under high-concurrency scenarios.

## Installation & Execution

### Prerequisites

- Node.js 18+
- Backend API running: [medical-scheduling-platform-api](https://github.com/sebast825/medical-scheduling-platform-api)

### Steps

  ```bash
  # Clone repository
  git clone 
  
  # Install dependencies
  npm install
  
  # Development mode
  npm start
  
  # Production build
  npm run build
  ```

## Key Features

- **Multi-Role RBAC:** Differentiated, protected interfaces for Patients, Doctors, Secretaries, and Administrators with client-side guards mirroring backend JWT claims.
- **Smart Appointment Booking:** Interactive calendar consuming real-time available slots; prevents visual conflicts before confirmation via atomic form handling.
- **Efficient Server State:** TanStack Query v5 for caching, background synchronization, prefetching, and automatic error/loading states.
- **Advanced Data Tables:** TanStack Table v8 for paginated, filtered, and sortable lists across all role dashboards.
- **Secure Auth Flow:** JWT stored in Context API with Axios interceptors for automatic token injection and 401 handling.
- **Lightweight Forms:** Real-time validation using native React state and custom regex patterns (`utils/validar*.ts`) without external form libraries.

## Tech Stack

- **Core:** React + TypeScript
- **Styles:** Bootstrap 5 + Sass (Global variables, mixins, component-scoped classes)
- **Server State:** TanStack Query (React Query)
- **Routing:** React Router DOM 
- **HTTP Client:** Axios (with centralized interceptors)

## Frontend Architecture & Backend Alignment

- **Optimistic UI & Cache Invalidation:** TanStack Query configured for immediate UI feedback on booking actions, with automatic refetching on conflict errors to maintain consistency with backend atomic operations.
- **Real-Time Availability Rendering:** Dynamic slot visualization synced with backend availability engine. Gracefully updates UI when slots become unavailable during selection in high-contention scenarios.
- **RBAC Enforcement Mirror:** Route guards (`useIsAdministrador`, `useIsMedico`, etc.) strictly mirror backend role claims, preventing unauthorized navigation while backend remains single source of truth.
- **Atomic Form Handling:** Client-side validation reduces invalid API calls, complementing backend conflict prevention logic.

## Key Technical Implementations

- **Axios Interceptor Pipeline:** Centralized token injection, 401 auto-refresh, and error normalization.
- **Domain-Specific Hook Layer:** Business logic fully decoupled from components. Each domain (`turnos`, `medicos`, `disponibilidad`) has dedicated cache, mutation, and logic hooks.
- **Type-Safe DTO Contract:** TypeScript interfaces (`types/`) aligned with backend Swagger/OpenAPI specs, ensuring compile-time safety across full stack.
- **Reusable Generic Components:** `GenericCard`, `GenericModal`, and `TableLicense` built with composition patterns for consistency across 4 distinct role dashboards.

## Frontend Performance & UX

- **Perceived Latency <200ms:** TanStack Query prefetching + caching ensures slot selection feels instant, matching backend response times.
- **3-Step Booking Flow:** Patient appointment creation reduced to minimal interactions, validated via custom hooks before API submission.
- **Bundle Optimization:** Code-splitting by role routes (`pages/administrador`, `pages/medico`, etc.) minimizes initial load for non-admin users.
- **Error Resilience:** Global error boundary + toast notifications provide clear feedback on concurrency conflicts without breaking user flow.

