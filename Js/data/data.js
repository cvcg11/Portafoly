export const files = [
  {
    id: "README.md",
    label: "README.md",
    iconKey: "readme",
    language: "markdown",
    content: `# Christian Gómez | Backend Engineer (Java • Spring Boot • SQL)

Backend-oriented Software Engineering student  
🏷️ committers.top badge

---

## About Me
Software Engineering student focused on backend development with Java and SQL, with hands-on experience integrating web, mobile, and desktop applications through REST APIs.

I prioritize clean and maintainable architectures, applying:
- Domain-Driven Design (DDD) principles
- Layered architecture with DTO-based validation
- Business rules and transactional consistency

---

## Development Activity
Total Time: 501 hrs 25 mins

Java              237 hrs 24 mins  (47.32%)
JavaScript        126 hrs 2 mins   (25.12%)
SQL               41 hrs 53 mins   (08.35%)

---

## Core Expertise
**Backend:** Java 17+, Spring Boot, JPA/Hibernate, REST API design, Spring Security  
**Databases:** MySQL, SQL Server, Oracle (OCI Autonomous Database)

**Working Practices:**
- JWT-based authentication
- CSRF protection (XSRF-TOKEN cookies)
- Transactional methods
- Asynchronous execution after commit
- Global error handling

---

## System Integration Experience
- Web applications consuming REST APIs (HTML, CSS, JavaScript)
- Mobile hybrid applications (Capacitor)
- Desktop applications (C# + SQL Server)
- Client–server communication and data consistency
`
  },

  {
    id: "inicio.js",
    label: "inicio.js",
    iconKey: "js",
    language: "javascript",
    content: `// inicio.js
export const home = {
  title: "Christian Gómez",
  role: "Backend Engineer",
  stack: ["Java 17+", "Spring Boot", "SQL", "REST APIs"],
  focus: "Backend-oriented Software Engineering student"
};

// Tip: este archivo representa tu 'home' como si fuera un módulo.
`
  },

  {
    id: "sobre-mi.js",
    label: "sobre-mi.js",
    iconKey: "user",
    language: "javascript",
    content: `// sobre-mi.js
export const aboutMe = {
  summary:
    "Software Engineering student focused on backend development with Java and SQL. " +
    "Experience integrating web, mobile, and desktop apps through REST APIs.",

  principles: [
    "Domain-Driven Design (DDD)",
    "Layered architecture + DTO validation",
    "Business rules & transactional consistency"
  ],

  mindset: [
    "Clean architecture over quick hacks",
    "Maintainability and clarity",
    "Consistent behavior under transactions"
  ]
};
`
  },

  {
    id: "proyectos.js",
    label: "proyectos.js",
    iconKey: "folder",
    language: "javascript",
    content: `// proyectos.js
export const projects = [
  {
    name: "RISKOR - Sistema de salud y seguridad ocupacional",
    description: "Aplicación web de El Salvador destinada a administrar reportes de accidentes e inventario de EPP (Equipo de Protección Personal).",
    stack: ["Spring Boot", "Java", "Oracle", "HTML", "CSS", "JS"],
    link: "https://riskor.vercel.app/"
  },
  {
    name: "Leal Import",
    description: "Sistema operativo para importación y venta de vehículos con taller: inventario, costos, ventas, órdenes de trabajo y evidencias de pagos/costos con reglas fuertes de consistencia.",
    stack: ["Spring Boot", "Java", "postgresql", "HTML", "CSS", "JS"],
    link: "En producción..."
  }
];

// Links:
// - RISKOR: https://riskor.vercel.app/
`
  },

  {
    id: "habilidades.js",
    label: "habilidades.js",
    iconKey: "bolt",
    language: "javascript",
    content: `// habilidades.js
export const skills = {
  backend: [
    "Java 17+",
    "Spring Boot",
    "JPA / Hibernate",
    "REST API design",
    "Spring Security"
  ],
  databases: [
    "MySQL",
    "SQL Server",
    "Oracle (OCI Autonomous Database)"
  ],
  practices: [
    "JWT auth",
    "CSRF (XSRF-TOKEN cookies)",
    "Transactional consistency",
    "Async after commit",
    "Global error handling"
  ],
  integration: [
    "Web (HTML/CSS/JS) consuming REST",
    "Mobile hybrid (Capacitor)",
    "Desktop (C# + SQL Server)"
  ]
};
`
  },

  {
    id: "contacto.js",
    label: "contacto.js",
    iconKey: "mail",
    language: "javascript",
    content: `// contacto.js
export const contact = {
  email: " cristianvcg11@gmail.com ",
  github: " https://github.com/cvcg11 ",
  location: "El Salvador"
};

// Links:
// - Email: mailto:cristianvcg11@gmail.com
// - GitHub: https://github.com/cvcg11
`
  }
];
