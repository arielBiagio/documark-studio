export const SAMPLE_DOCUMENTS = {
  technical: {
    name: 'Reporte Técnico & Análisis',
    title: 'Reporte de Arquitectura de Sistemas 2026',
    content: `# 🚀 Arquitectura Cloud & Microservicios v3.2

**Autor:** Equipo de Infraestructura y Plataforma  
**Fecha:** Noviembre 2026  
**Estado:** \`En Producción\` | **Clasificación:** Confidencial Interno

---

## 📌 Resumen Ejecutivo

Este documento detalla la modernización de los servicios de procesamiento de datos en tiempo real, implementando una arquitectura distribuida basada en eventos, alta resiliencia y tolerancia a fallos.

> [!NOTE]
> La migración completa redujo la latencia P99 en un **68%** y los costos de infraestructura en un **34%** durante el último trimestre.

> [!TIP]
> Para entornos de desarrollo local, utilice los contenedores Docker orquestados con el comando \`docker compose up -d\`.

---

## 🛠️ Tecnologías Principales

| Componente | Tecnología | Versión | Rendimiento (req/s) |
| :--- | :--- | :--- | :--- |
| **API Gateway** | Envoy Proxy | 1.30.0 | ~85,000 |
| **Event Broker** | Apache Kafka | 3.8.0 | ~450,000 msg/s |
| **Core Service** | Go / Rust | 1.23 / 1.80 | Sub-millisecond |
| **Persistencia** | PostgreSQL + Citus | 16.4 | Read-Replica Pool |
| **Caché** | Dragonfly / Redis | 7.2 | In-memory 10M IOPS |

---

## 📊 Arquitectura del Flujo de Datos

\`\`\`mermaid
flowchart LR
    Client([💻 Cliente Web / Móvil]) -->|HTTPS / WSS| Gateway[🛡️ API Gateway]
    Gateway --> Auth[🔐 Auth Service]
    Gateway --> Kafka[(⚡ Apache Kafka Broker)]
    Kafka --> WorkerA[⚙️ Worker Procesamiento]
    Kafka --> WorkerB[📈 Worker Analítica]
    WorkerA --> DB[(🗄️ PostgreSQL)]
    WorkerB --> Warehouse[(❄️ Data Lake)]
\`\`\`

---

## 💻 Fragmentos de Código

### Ejemplo de Cliente en TypeScript
\`\`\`typescript
interface StreamEvent<T> {
  id: string;
  timestamp: number;
  payload: T;
  signature: string;
}

export async function dispatchEvent<T>(topic: string, event: StreamEvent<T>): Promise<boolean> {
  console.log(\`[KafkaProducer] Emitiendo evento a \${topic}...\`);
  try {
    const response = await fetch(\`/api/v1/stream/\${topic}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    return response.ok;
  } catch (err) {
    console.error('Error al despachar el evento:', err);
    return false;
  }
}
\`\`\`

### Script de Optimización en Python
\`\`\`python
import numpy as np

def calculate_latency_percentiles(latencies: list[float]) -> dict:
    data = np.array(latencies)
    return {
        "p50": float(np.percentile(data, 50)),
        "p95": float(np.percentile(data, 95)),
        "p99": float(np.percentile(data, 99)),
        "avg": float(np.mean(data))
    }
\`\`\`

---

## 🧮 Modelado Matemático y Rendimiento

La ley de Little nos permite estimar el número medio de peticiones concurrentes $L$ en el sistema:

$$L = \\lambda \\times W$$

Donde:
- $\\lambda$ representa la tasa de llegada de peticiones por segundo.
- $W$ es el tiempo medio que una petición pasa en el sistema (latencia promedio).

Para el cálculo de resiliencia ante caídas según el teorema de Bayes:

$$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$

---

## ✅ Lista de Tareas y Verificaciones

- [x] Despliegue de clúster Kubernetes en multi-región
- [x] Configuración de mTLS entre microservicios
- [x] Pruebas de carga sostenida a 100,000 req/s
- [ ] Implementación de circuit breakers con Istio
- [ ] Auditoría de seguridad SOC2 y PCI-DSS

> [!WARNING]
> Recuerde rotar las claves criptográficas maestras antes del 1 de diciembre de 2026.

---

*Fin del informe oficial. Generado con DocuMark Studio.*
`
  },
  cv: {
    name: 'Currículum Vitae Moderno',
    title: 'Curriculum Vitae — Senior Software Engineer',
    content: `# Alejandro Morales
**Lead Full Stack Engineer & Cloud Architect**  
📍 Madrid, España | ✉️ alejandro.dev@ejemplo.com | 🌐 https://alejandromorales.dev | 💼 linkedin.com/in/alejandro-dev

---

## 🎯 Perfil Profesional

Ingeniero de software con más de 8 años de experiencia liderando equipos técnicos y construyendo aplicaciones web distribuidas de alto impacto. Especializado en arquitectura de microservicios, React, Node.js/Go y plataformas Cloud (AWS/GCP). Apasionado por la excelencia en la experiencia de usuario, código limpio y rendimiento óptimo.

---

## 💼 Experiencia Laboral

### **Staff Software Engineer** | CloudScale Tech
*Enero 2023 — Presente | Remoto*
- Lideré la migración del monolito a una arquitectura orientada a eventos con Kafka y Kubernetes, aumentando la disponibilidad al **99.99%**.
- Reduje los tiempos de compilación y despliegue CI/CD de 45 a 8 minutos implementando pipelines concurrentes.
- Mentoré a un equipo de 12 ingenieros júnior y mid-level, estableciendo estándares de pruebas automatizadas con 85%+ de cobertura.

### **Senior Frontend Specialist** | Innova Digital
*Marzo 2020 — Diciembre 2022 | Barcelona*
- Diseñé y desarrollé un Design System unificado utilizado por más de 15 aplicaciones del ecosistema corporativo.
- Optimicé los Core Web Vitals alcanzando un score de 98+ en Lighthouse y mejorando la tasa de conversión en un 22%.

---

## 🛠️ Habilidades Técnicas

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, WebSockets.
- **Backend & Cloud:** Node.js, Go, Python, GraphQL, Docker, Kubernetes, AWS (Lambda, ECS, S3).
- **Bases de Datos:** PostgreSQL, Redis, MongoDB, ClickHouse.
- **Prácticas:** Arquitectura Hexagonal, TDD, CI/CD, Microfrontends, Agile / Scrum.

---

## 🎓 Educación

- **Grado en Ingeniería Informática**  
  *Universidad Politécnica de Madrid (2015 — 2019)*
- **Certificación AWS Certified Solutions Architect – Professional**  
  *Amazon Web Services (2024)*

---

## 🌐 Idiomas

- **Español:** Nativo
- **Inglés:** Profesional C1 (Certificado Cambridge CAE)
`
  },
  guide: {
    name: 'Guía de Usuario / Docs',
    title: 'Manual de Integración API REST',
    content: `# 📘 Guía de Inicio Rápido: API v2

Bienvenido a la documentación de integración para desarrolladores. Siga estos sencillos pasos para autenticarse y comenzar a realizar peticiones.

---

## 🔑 Autenticación

Todas las solicitudes a los endpoints de la API deben incluir el encabezado \`Authorization\` con su Bearer token:

\`\`\`http
GET /api/v2/users HTTP/1.1
Host: api.servidor.com
Authorization: Bearer TU_API_KEY_AQUI
Accept: application/json
\`\`\`

> [!IMPORTANT]
> Nunca comparta su API Key en repositorios públicos o código del lado del cliente.

---

## ⚡ Respuestas Estándar

Todas las respuestas exitosas devuelven una estructura JSON coherente:

\`\`\`json
{
  "success": true,
  "status": 200,
  "data": {
    "userId": "usr_99812",
    "name": "María García",
    "tier": "enterprise"
  },
  "timestamp": "2026-11-14T20:30:00Z"
}
\`\`\`

### Códigos de Estado Comunes

1. \`200 OK\` — Petición exitosa.
2. \`400 Bad Request\` — Parámetros inválidos.
3. \`401 Unauthorized\` — Token expirado o ausente.
4. \`429 Too Many Requests\` — Límite de tasa alcanzado.
`
  }
};
