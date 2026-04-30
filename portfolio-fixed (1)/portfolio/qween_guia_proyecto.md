# 🧠 Guía del Proyecto - Neural Portfolio de Ariadna

## 📋 Descripción General

Este proyecto es un **portfolio web interactivo** para **Ariadna Ramos**, especialista en arquitecturas de IA y sistemas RAG (Retrieval-Augmented Generation). El sitio web combina un diseño visual futurista con **demos funcionales de chatbots** impulsados por inteligencia artificial de Google Gemini.

**Tipo de Aplicación:** Portfolio web SPA (Single Page Application)
**Framework Principal:** React 19 + TypeScript
**Estilo:** Cyberpunk / Neural UI con animaciones avanzadas

---

## 🚀 Tecnologías Principales

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.0.0 | Framework UI principal |
| **TypeScript** | ~5.8.2 | Tipado estático |
| **Vite** | 6.2.0 | Bundler y servidor de desarrollo |
| **Tailwind CSS** | 4.1.14 | Estilos utilitarios |
| **Motion (Framer Motion)** | 12.38.0 | Animaciones complejas |
| **Lucide React** | 0.546.0 | Iconografía |

### IA / Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **@google/genai** | 1.49.0 | SDK de Google Gemini AI |
| **Express** | 4.21.2 | Servidor Node.js (si aplica) |
| **Dotenv** | 17.2.3 | Gestión de variables de entorno |

### Herramientas de Desarrollo
- **tsx**: Ejecución de TypeScript
- **Autoprefixer**: Compatibilidad CSS

---

## 📁 Estructura del Proyecto

```
programacion/
├── index.html                    # Punto de entrada HTML
├── package.json                  # Dependencias y scripts
├── vite.config.ts                # Configuración de Vite
├── tsconfig.json                 # Configuración de TypeScript
├── .env.example                  # Ejemplo de variables de entorno
├── .gitignore                    # Archivos ignorados por Git
├── README.md                     # Documentación original
│
└── src/
    ├── main.tsx                  # Punto de entrada de la aplicación
    ├── App.tsx                   # Componente principal (895 líneas)
    ├── index.css                 # Estilos globales y temas Tailwind
    │
    ├── components/
    │   └── ChatbotDemo.tsx       # Componente de chat interactivo
    │
    └── lib/
        └── gemini.ts             # Integración con API de Google Gemini
```

---

## 🎨 Paleta de Colores y Tema

El proyecto utiliza un tema **oscuro futurista** con acentos neón:

| Variable | Color | Uso |
|----------|-------|-----|
| `--color-background` | `#020408` | Fondo principal |
| `--color-surface-container` | `#0c0f1a` | Contenedores y tarjetas |
| `--color-primary` | `#00f2ff` | Acento principal (cian neón) |
| `--color-secondary` | `#7000ff` | Acento secundario (violeta) |

**Tipografías:**
- **Headlines:** Space Grotesk (geométrica, futurista)
- **Cuerpo:** Inter (legible, moderna)

---

## 🧩 Componentes Principales

### 1. `App.tsx` - Componente Principal

**Responsabilidades:**
- Gestión de toda la UI del portfolio
- Sistema de traducción ES/EN
- Navegación por secciones
- Animaciones con Motion
- Estado del demo de chatbot

**Secciones del Portfolio:**
1. **Hero Section** - Presentación impactante con título animado
2. **Bento Grid Skills** - Ecosistema técnico en grid asimétrico
3. **Proyectos** - Showcase de 3 proyectos principales:
   - **Correos Express AI** - Agente inteligente para logística
   - **SEUR Smart Logistics** - Optimización logística predictiva
   - **Telefónica Neural Search** - Arquitectura RAG avanzada
4. **Metodología** - Proceso de trabajo en 4 pasos
5. **AI Playground** - Laboratorio de análisis semántico interactivo
6. **Sobre Mí** - Historia profesional de Ariadna
7. **Contacto** - Formulario y enlaces de contacto

**Características Técnicas Destacadas:**
- Cursor personalizado con física (springs)
- Barra de progreso de scroll
- Efectos de parallax con `useTransform`
- Tarjetas 3D con rotación al hover
- Grid neural animado de fondo
- Blobs flotantes con blur

### 2. `ChatbotDemo.tsx` - Componente de Chat

**Responsabilidades:**
- Interfaz de chat modal
- Comunicación con API Gemini
- Animaciones de mensajes
- Gestión de estado de conversación

**Props:**
```typescript
interface ChatbotDemoProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  context: string;
}
```

**Flujo de Uso:**
1. Usuario abre demo desde proyecto
2. Se muestra mensaje de bienvenida contextual
3. Usuario envía mensaje
4. Componente llama a `chatWithAI()` de Gemini
5. Respuesta se muestra con animación

### 3. `gemini.ts` - Integración IA

**Función Principal:**
```typescript
async function chatWithAI(message: string, context: string): Promise<string>
```

**Configuración:**
- **Modelo:** `gemini-2.0-flash`
- **API Key:** `process.env.GEMINI_API_KEY`
- **System Instruction:** Define personalidad y contexto del asistente

**Manejo de Errores:**
- Retorna mensaje de error amigable si falla la API
- Log de errores en consola

---

## ⚙️ Configuración del Proyecto

### Scripts Disponibles

```bash
npm run dev       # Inicia servidor de desarrollo (puerto 3000)
npm run build     # Compila para producción
npm run preview   # Previsualiza build local
npm run clean     # Elimina carpeta dist
npm run lint      # Verifica tipos con TypeScript
```

### Variables de Entorno

Crear archivo `.env.local` con:

```env
GEMINI_API_KEY=tu-api-key-aqui
```

**Obtener API Key:**
1. Ir a [Google AI Studio](https://ai.studio/)
2. Generar clave de API
3. Copiar al archivo `.env.local`

---

## 🌐 Internacionalización (i18n)

El proyecto soporta **español** e **inglés** mediante un objeto de traducciones:

```typescript
const translations = {
  es: { /* claves en español */ },
  en: { /* claves en inglés */ }
};
```

**Uso:**
```typescript
const t = translations[activeLang];
// Luego: {t.hero_title_1}
```

---

## 🎭 Sistema de Animaciones

### Motion (Framer Motion) Features Utilizadas

| Feature | Uso |
|---------|-----|
| `motion.div` | Elementos animados |
| `useScroll` | Progreso de scroll |
| `useSpring` | Física suave |
| `useTransform` | Mapeo de valores a scroll |
| `useMotionValue` | Valores reactivos |
| `AnimatePresence` | Animaciones de entrada/salida |

### Animaciones Clave

1. **Cursor personalizado** - Sigue el mouse con springs
2. **Barra de progreso** - Se expande con el scroll
3. **Parallax de blobs** - Se mueven en direcciones opuestas
4. **Tarjetas 3D** - Rotan según posición del mouse
5. **Scroll reveal** - Elementos aparecen al hacer scroll
6. **Gradiente infinito** - Texto con animación de gradiente

---

## 🎯 Estilos Tailwind Personalizados

### Clases de Utilidad Personalizadas

| Clase | Propósito |
|-------|-----------|
| `.glass-card` | Tarjeta con efecto glassmorphism |
| `.primary-gradient-text` | Texto con gradiente animado |
| `.btn-primary` | Botón principal con glow |
| `.btn-secondary` | Botón secundario glass |
| `.neural-grid` | Fondo con patrón de puntos |
| `.blob` | Formas difuminadas flotantes |
| `.bento-grid` | Grid asimétrico para skills |
| `.chat-bubble` | Burbujas de chat estilizadas |

---

## 🔍 Proyectos Showcase

### 1. Correos Express AI
- **Descripción:** Agente inteligente para resolución autónoma de incidencias
- **Métrica:** 45% reducción de tiempo
- **Tecnologías:** FastAPI, Gemini
- **Demo:** Chat interactivo funcional

### 2. SEUR Smart Logistics
- **Descripción:** Optimización logística con modelos predictivos
- **Métrica:** 30% eficiencia de entrega
- **Tecnologías:** PyTorch, ML

### 3. Telefónica Neural Search
- **Descripción:** Arquitectura RAG para búsqueda semántica masiva
- **Métrica:** 10k+ tickets/día
- **Tecnologías:** Pinecone, RAG

---

## 🚦 Flujo de Desarrollo

### Para Empezar

```bash
# 1. Clonar/reposicionar el proyecto
cd c:\Users\A8-04m\Documents\programacion

# 2. Instalar dependencias
npm install

# 3. Configurar API key
# Crear .env.local con GEMINI_API_KEY

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir navegador en http://localhost:3000
```

### Para Producción

```bash
# Compilar
npm run build

# Previsualizar build
npm run preview
```

---

## ⚠️ Notas Importantes

### Seguridad
- **NUNCA** commitear `.env.local` al repositorio
- Usar `.env.example` como plantilla pública
- La API key de Gemini debe mantenerse privada

### Rendimiento
- HMR deshabilitado en AI Studio (por `DISABLE_HMR`)
- File watching deshabilitado para prevenir flickering
- Imágenes externas usan `referrerPolicy="no-referrer"`

### Convenciones de Código
- **Rutas alias:** `@/*` mapea a la raíz del proyecto
- **TSConfig:** Target ES2022, JSX react-jsx
- **Módulos:** ESNext con moduleResolution bundler

---

## 🔗 Enlaces Útiles

- **Google AI Studio:** https://ai.studio/
- **Documentación Gemini:** https://ai.google.dev/gemini-api/docs
- **React Docs:** https://react.dev/
- **Motion Docs:** https://www.motion.dev/
- **Tailwind CSS:** https://tailwindcss.com/

---

## 👤 Sobre la Autora

**Ariadna Ramos**
- **Especialidad:** Arquitecturas de IA y sistemas RAG
- **Background:** Animación 2D/3D → Ingeniería de IA
- **Email:** ariadnart2005@gmail.com
- **Experiencia:** 4+ años de innovación, 15+ sistemas desplegados

---

## 📝 Posibles Mejoras Futuras

- [ ] Backend propio para persistencia de chats
- [ ] Base de datos vectorial para RAG real
- [ ] Sistema de autenticación
- [ ] Tests unitarios y E2E
- [ ] Optimización de imágenes (lazy loading)
- [ ] Accesibilidad (ARIA labels, keyboard nav)
- [ ] SEO meta tags dinámicos
- [ ] Analytics de uso del portfolio

---

**Última actualización:** abril 2026
**Versión del documento:** 1.0
