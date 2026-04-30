import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useInView,
  AnimatePresence
} from 'motion/react';
import {
  Bot,
  Code,
  Mail,
  Github,
  Linkedin,
  ChevronDown,
  Bolt,
  MessageSquare,
  ExternalLink,
  Globe,
  Cpu,
  Layers,
  Terminal,
  Database,
  Workflow,
  ShieldCheck,
  Zap,
  Sparkles,
  Search,
  Brain,
  Rocket,
  Target,
  BarChart3,
  MousePointer2,
  CheckCircle2,
  Clock,
  Settings
} from 'lucide-react';
import ChatbotDemo from './components/ChatbotDemo';
import FloatingParticles from './components/FloatingParticles';
import TypingEffect from './components/TypingEffect';
import AnimatedCounter from './components/AnimatedCounter';
import { analyzeText } from './lib/localAI';

export default function App() {
  const [activeLang, setActiveLang] = useState<'es' | 'en'>('es');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoTitle, setDemoTitle] = useState('');
  const [demoContext, setDemoContext] = useState('');
  const [playgroundText, setPlaygroundText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const ProjectCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const openDemo = (title: string, context: string) => {
    setDemoTitle(title);
    setDemoContext(context);
    setIsDemoOpen(true);
  };

  const translations = {
    es: {
      nav_home: "Inicio", nav_projects: "Proyectos", nav_about: "Trayectoria", nav_contact: "Contacto",
      cta_connect: "Conectar", hero_tag: "Arquitecta de Inteligencia Artificial", hero_title_1: "Creando el",
      hero_title_2: "Futuro Cognitivo", hero_desc: "Especialista en arquitecturas de IA y sistemas RAG. Transformo la complejidad técnica en experiencias conversacionales fluidas y humanas.",
      hero_cta_1: "Explorar Proyectos", hero_cta_2: "Agendar Consulta", scroll_explore: "Explorar",
      proj_subtitle: "Portfolio Seleccionado", proj_title: "Ingeniería de Agentes", proj_quote: "\"La IA no es solo código; es la nueva interfaz de la inteligencia humana.\"",
      tag_customer: "Customer Experience", tag_logistics: "Smart Logistics", btn_demo: "Lanzar Demo",
      btn_open_demo: "ABRIR PROYECTO", btn_chat_demo: "Iniciar Chat",
      p1_desc: "Agente inteligente para Correos Express. Resolución autónoma de incidencias y seguimiento predictivo de envíos.",
      p1_metric: "45% Reducción de Tiempo",
      p2_desc: "Sistema de optimización logística para SEUR. Integración de modelos predictivos para la gestión de última milla.",
      p2_metric: "30% Eficiencia de Entrega",
      p3_desc: "Arquitectura RAG avanzada para Telefónica. Búsqueda semántica sobre petabytes de documentación técnica.",
      p3_metric: "10k+ Tickets/Día",
      about_subtitle: "Mi Historia", about_title: "De la Animación a la IA", about_stat_1: "Años de Innovación", about_stat_2: "Sistemas Desplegados",
      about_p1: "Mi formación en Animación 2D/3D me dio una perspectiva única: entiendo el flujo, el ritmo y la experiencia del usuario antes de escribir una sola línea de código.",
      about_p2: "Evolucioné hacia la Ingeniería de IA buscando dotar de 'vida' y lógica a los sistemas digitales. Hoy diseño cerebros artificiales para las empresas líderes.",
      about_p3: "Mi enfoque combina el rigor técnico de la ingeniería con la sensibilidad estética del diseño, creando soluciones que son tan potentes como intuitivas.",
      contact_title: "¿Listo para el siguiente nivel?", contact_desc: "Estoy disponible para colaboraciones estratégicas y proyectos de alto impacto en IA.",
      contact_mail: "Email Directo", form_name: "Nombre", form_message: "Tu Propuesta", form_btn: "Enviar Propuesta",
      footer_tag: "Neural Portfolio v2.0", footer_copy: "Diseñado para impresionar.",
      method_title: "Mi Metodología",
      method_step1_title: "Descubrimiento",
      method_step1_desc: "Análisis profundo de necesidades y viabilidad técnica.",
      method_step2_title: "Arquitectura",
      method_step2_desc: "Diseño de la infraestructura y selección de modelos LLM.",
      method_step3_title: "Desarrollo",
      method_step3_desc: "Implementación iterativa con RAG y fine-tuning.",
      method_step4_title: "Despliegue",
      method_step4_desc: "Optimización continua y monitoreo de rendimiento.",
      playground_title: "Laboratorio de IA",
      playground_desc: "Prueba mi motor de análisis semántico en tiempo real.",
      playground_placeholder: "Pega un texto aquí para analizar su intención...",
      playground_btn: "Analizar Texto",
      skills_title: "Ecosistema Técnico"
    },
    en: {
      nav_home: "Home", nav_projects: "Projects", nav_about: "Journey", nav_contact: "Contact",
      cta_connect: "Connect", hero_tag: "AI Systems Architect", hero_title_1: "Engineering the",
      hero_title_2: "Cognitive Future", hero_desc: "Specializing in AI architectures and RAG systems. I bridge the gap between raw data and meaningful human interaction through intelligent agents.",
      hero_cta_1: "View Projects", hero_cta_2: "Book a Call", scroll_explore: "Explore",
      proj_subtitle: "Selected Portfolio", proj_title: "Agentic Engineering", proj_quote: "\"AI is not just code; it's the new interface for human potential.\"",
      tag_customer: "Customer Experience", tag_logistics: "Smart Logistics", btn_demo: "Launch Demo",
      btn_open_demo: "OPEN PROJECT", btn_chat_demo: "Start Chat",
      p1_desc: "Intelligent agent for Correos Express. Autonomous incident resolution and predictive shipment tracking.",
      p1_metric: "45% Time Reduction",
      p2_desc: "Logistics optimization system for SEUR. Integration of predictive models for last-mile management.",
      p2_metric: "30% Delivery Efficiency",
      p3_desc: "Advanced RAG architecture for Telefónica. Semantic search across petabytes of technical documentation.",
      p3_metric: "10k+ Tickets/Day",
      about_subtitle: "My Story", about_title: "From Animation to AI", about_stat_1: "Years of Innovation", about_stat_2: "Deployed Systems",
      about_p1: "My background in 2D/3D Animation gave me a unique edge: I understand flow, rhythm, and UX before I even touch the backend.",
      about_p2: "I transitioned into AI Engineering to give 'life' and logic to digital systems. Today, I build artificial brains for industry leaders.",
      about_p3: "My approach blends technical engineering rigor with design sensitivity, creating solutions that are as powerful as they are intuitive.",
      contact_title: "Ready for the next level?", contact_desc: "Available for strategic collaborations and high-impact AI initiatives.",
      contact_mail: "Email me", form_name: "Name", form_message: "Your Proposal", form_btn: "Send Proposal",
      footer_tag: "Neural Portfolio v2.0", footer_copy: "Designed to impress.",
      method_title: "My Methodology",
      method_step1_title: "Discovery",
      method_step1_desc: "Deep analysis of needs and technical feasibility.",
      method_step2_title: "Architecture",
      method_step2_desc: "Infrastructure design and LLM model selection.",
      method_step3_title: "Development",
      method_step3_desc: "Iterative implementation with RAG and fine-tuning.",
      method_step4_title: "Deployment",
      method_step4_desc: "Continuous optimization and performance monitoring.",
      playground_title: "AI Laboratory",
      playground_desc: "Test my real-time semantic analysis engine.",
      playground_placeholder: "Paste text here to analyze its intent...",
      playground_btn: "Analyze Text",
      skills_title: "Technical Ecosystem"
    }
  };

  const t = translations[activeLang];

  const techStack = [
    { name: "Gemini Pro", icon: <Sparkles size={16} /> },
    { name: "Python", icon: <Terminal size={16} /> },
    { name: "LangChain", icon: <Workflow size={16} /> },
    { name: "Pinecone", icon: <Database size={16} /> },
    { name: "React", icon: <Layers size={16} /> },
    { name: "FastAPI", icon: <Zap size={16} /> },
    { name: "PyTorch", icon: <Cpu size={16} /> },
    { name: "Docker", icon: <ShieldCheck size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-background text-white font-body selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      {/* Custom Cursor con efecto de breathing */}
      <motion.div
        className="custom-cursor hidden md:block"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="custom-cursor-dot hidden md:block"
        style={{ x: cursorX, y: cursorY }}
        whileTap={{ scale: 0.5 }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary to-secondary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ y: y1 }} 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="blob bg-primary/20 top-[-10%] left-[-10%] w-[600px] h-[600px]" 
        />
        <motion.div 
          style={{ y: y2 }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="blob bg-secondary/20 bottom-[-10%] right-[-10%] w-[600px] h-[600px]" 
        />
        <div className="neural-grid absolute inset-0 opacity-40" />
        
        {/* Estrellas fugaces */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 50}%`,
            }}
            animate={{
              x: [0, 300],
              y: [0, 150],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 4,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/20 backdrop-blur-2xl border-b border-white/5">
        <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter font-headline flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
                <Bot className="text-background" size={20} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-background flex items-center justify-center">
                <Sparkles className="text-white" size={8} />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white tracking-tighter">ARIADNA</span>
              <span className="text-primary text-[10px] tracking-[0.3em] font-bold">NEURAL LAB</span>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10 font-headline font-medium text-sm tracking-widest uppercase">
            {[
              { href: 'home', key: 'nav_home' },
              { href: 'proyectos', key: 'nav_projects' },
              { href: 'sobre-mi', key: 'nav_about' },
              { href: 'contacto', key: 'nav_contact' },
            ].map((item, i) => (
              <motion.a
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.href}`}
                className="text-white/50 hover:text-primary transition-all relative group"
              >
                {t[item.key as keyof typeof t]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
              <button 
                onClick={() => setActiveLang('es')}
                className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${activeLang === 'es' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-white/40'}`}
              >ES</button>
              <button 
                onClick={() => setActiveLang('en')}
                className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${activeLang === 'en' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-white/40'}`}
              >EN</button>
            </div>
            <a href="#contacto" className="btn-primary text-xs px-8 py-3 hidden sm:block">
              {t.cta_connect}
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Partículas flotantes */}
          <FloatingParticles />
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-surface-container-high overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/50/50`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">{t.hero_tag}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Efecto de brillo detrás del título */}
              <motion.div
                className="absolute inset-0 blur-3xl bg-primary/10 -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <h1 className="text-6xl md:text-9xl font-headline font-bold tracking-tighter leading-[0.9] mb-8">
                {t.hero_title_1} <br />
                <span className="primary-gradient-text">{t.hero_title_2}</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-3xl mx-auto text-lg md:text-2xl text-white/50 mb-12 leading-relaxed font-light"
            >
              {t.hero_desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.a 
                href="#proyectos" 
                className="btn-primary min-w-[220px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.hero_cta_1}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
              <motion.a 
                href="#contacto" 
                className="btn-secondary min-w-[220px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.hero_cta_2}
              </motion.a>
            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t.scroll_explore}</span>
            <div className="w-px h-12 bg-linear-to-b from-primary to-transparent" />
          </motion.div>
        </section>

        {/* Bento Grid Skills */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mb-24">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-headline font-bold"
              >
                {t.skills_title}
              </motion.h2>
            </div>

            <div className="bento-grid">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bento-item col-span-2 row-span-2 bg-linear-to-br from-primary/10 to-transparent"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-headline font-bold mb-4">Large Language Models</h3>
                  <p className="text-white/40 mb-6">Especialista en despliegue y optimización de modelos fundacionales (Gemini, GPT-4, Llama 3) para entornos empresariales.</p>
                  <div className="flex flex-wrap gap-2">
                    {['Prompt Engineering', 'Fine-tuning', 'RAG', 'Agentic Workflows'].map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 text-[10px] uppercase font-bold tracking-widest text-white/40 border border-white/10">{skill}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bento-item col-span-2 bg-linear-to-br from-secondary/10 to-transparent"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                    <Code size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-headline font-bold">Python Expert</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30">Core Language</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bento-item bg-white/[0.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 mb-4">
                  <Database size={20} />
                </div>
                <div className="text-xl font-headline font-bold">Vector DBs</div>
                <div className="text-xs text-white/30">Pinecone / Weaviate</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bento-item bg-white/[0.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 mb-4">
                  <Workflow size={20} />
                </div>
                <div className="text-xl font-headline font-bold">LangChain</div>
                <div className="text-xs text-white/30">Orchestration</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bento-item col-span-2 bg-linear-to-br from-primary/5 to-transparent"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                    <Cpu size={32} />
                  </div>
                  <div>
                    <div className="text-2xl font-headline font-bold">PyTorch / TensorFlow</div>
                    <p className="text-sm text-white/40">Entrenamiento y evaluación de modelos de Deep Learning.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bento-item col-span-2 bg-white/[0.02]"
              >
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="text-xl font-headline font-bold">Cloud & DevOps</div>
                    <div className="flex gap-2">
                      <span className="text-[10px] text-white/30 border border-white/10 px-2 py-1 rounded">AWS</span>
                      <span className="text-[10px] text-white/30 border border-white/10 px-2 py-1 rounded">GCP</span>
                      <span className="text-[10px] text-white/30 border border-white/10 px-2 py-1 rounded">Docker</span>
                    </div>
                  </div>
                  <ShieldCheck size={40} className="text-white/10" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="proyectos" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mb-24">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-primary text-sm font-bold uppercase tracking-[0.4em] mb-6 block"
              >
                {t.proj_subtitle}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-headline font-bold leading-tight"
              >
                {t.proj_title}
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 gap-32">
              {/* Project 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                className="group grid md:grid-cols-2 gap-12 items-center"
              >
                <ProjectCard className="relative aspect-video rounded-2xl overflow-hidden glass-card p-2 group-hover:scale-[1.02] transition-transform duration-700">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" 
                    alt="Correos Express" 
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </ProjectCard>
                <div className="space-y-8">
                  <div className="flex gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">{t.tag_customer}</span>
                    <span className="px-4 py-1.5 rounded-full bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-widest border border-white/10">FastAPI</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-headline font-bold">Correos Express AI</h3>
                  <p className="text-white/50 text-xl leading-relaxed font-light">{t.p1_desc}</p>
                  
                  <div className="flex items-center gap-4 py-4">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 cursor-pointer"
                    >
                      <BarChart3 size={18} className="text-primary" />
                      <span className="text-sm font-bold text-primary">{t.p1_metric}</span>
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => openDemo('Correos Express AI', 'Agente inteligente para resolución autónoma de incidencias logísticas.')}
                      className="btn-primary px-10"
                    >
                      {t.btn_demo}
                    </button>
                    <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 transition-all">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                className="group grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 md:order-1 space-y-8">
                  <div className="flex gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest border border-secondary/20">{t.tag_logistics}</span>
                    <span className="px-4 py-1.5 rounded-full bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-widest border border-white/10">PyTorch</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-headline font-bold">SEUR Smart Logistics</h3>
                  <p className="text-white/50 text-xl leading-relaxed font-light">{t.p2_desc}</p>
                  
                  <div className="flex items-center gap-4 py-4">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/20 cursor-pointer"
                    >
                      <Target size={18} className="text-secondary" />
                      <span className="text-sm font-bold text-secondary">{t.p2_metric}</span>
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => openDemo('SEUR Smart Logistics', 'Sistema de optimización logística con modelos predictivos.')}
                      className="btn-primary px-10"
                    >
                      {t.btn_demo}
                    </button>
                    <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 transition-all">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                <ProjectCard className="order-1 md:order-2 relative aspect-video rounded-2xl overflow-hidden glass-card p-2 group-hover:scale-[1.02] transition-transform duration-700">
                  <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" 
                    alt="SEUR AI" 
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </ProjectCard>
              </motion.div>

              {/* Project 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                className="group glass-card p-12 rounded-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                    alt="" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-surface-container to-transparent" />
                </div>
                <div className="relative z-10 max-w-2xl space-y-8">
                  <div className="flex gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">RAG Architecture</span>
                    <span className="px-4 py-1.5 rounded-full bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-widest border border-white/10">Pinecone</span>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-headline font-bold">Telefónica Neural Search</h3>
                  <p className="text-white/50 text-2xl leading-relaxed font-light">{t.p3_desc}</p>
                  <div className="flex flex-wrap gap-6">
                    <button 
                      onClick={() => openDemo('Telefónica Neural Search', 'Arquitectura RAG avanzada para búsqueda semántica masiva.')}
                      className="btn-primary px-12 py-5 text-lg"
                    >
                      {t.btn_chat_demo}
                    </button>
                    <a href="#" className="btn-secondary px-12 py-5 text-lg">
                      Technical Case Study
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-32 relative overflow-hidden bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-headline font-bold mb-8"
              >
                {t.method_title}
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: <Search />, title: t.method_step1_title, desc: t.method_step1_desc },
                { icon: <Settings />, title: t.method_step2_title, desc: t.method_step2_desc },
                { icon: <Code />, title: t.method_step3_title, desc: t.method_step3_desc },
                { icon: <Rocket />, title: t.method_step4_title, desc: t.method_step4_desc }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-10 rounded-[2.5rem] relative group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                  <div className="text-4xl font-headline font-bold text-white/10 absolute top-10 right-10">0{i + 1}</div>
                  <h3 className="text-2xl font-headline font-bold mb-4">{step.title}</h3>
                  <p className="text-white/40 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Playground Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="glass-card p-12 md:p-24 rounded-[4rem] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-radial from-secondary/5 to-transparent opacity-50" />
              <div className="relative z-10 grid md:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                  <h2 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
                    {t.playground_title}
                  </h2>
                  <p className="text-white/50 text-xl font-light leading-relaxed">
                    {t.playground_desc}
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-white/30">
                      <CheckCircle2 size={20} className="text-primary" />
                      <span>Análisis de Intención</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/30">
                      <CheckCircle2 size={20} className="text-primary" />
                      <span>Extracción de Entidades</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/30">
                      <CheckCircle2 size={20} className="text-primary" />
                      <span>Clasificación de Sentimiento</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <textarea 
                      value={playgroundText}
                      onChange={(e) => setPlaygroundText(e.target.value)}
                      placeholder={t.playground_placeholder}
                      className="w-full bg-black/40 border border-white/10 rounded-3xl p-8 text-lg focus:border-primary outline-none transition-all resize-none h-64 placeholder:text-white/10"
                    />
                    <button 
                      onClick={async () => {
                        if (!playgroundText.trim()) return;
                        setIsAnalyzing(true);
                        const result = analyzeText(playgroundText);
                        setTimeout(() => {
                          setAnalysisResult(result);
                          setIsAnalyzing(false);
                        }, 800);
                      }}
                      className="absolute bottom-6 right-6 btn-primary py-3 px-8 text-sm"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? "Analizando..." : t.playground_btn}
                    </button>
                  </div>

                  <AnimatePresence>
                    {analysisResult && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-3 gap-4"
                      >
                        <div className="glass-card p-4 rounded-2xl text-center">
                          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Intención</div>
                          <div className="text-primary font-bold">{analysisResult.intent}</div>
                        </div>
                        <div className="glass-card p-4 rounded-2xl text-center">
                          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Sentimiento</div>
                          <div className="text-secondary font-bold">{analysisResult.sentiment}</div>
                        </div>
                        <div className="glass-card p-4 rounded-2xl text-center">
                          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Entidades</div>
                          <div className="text-white/60 font-bold">{analysisResult.entities.length}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section id="sobre-mi" className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden glass-card p-3">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" 
                    alt="Ariadna Ramos" 
                    className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-secondary/20 blur-[100px] -z-10" />
              </motion.div>

              <div className="space-y-12">
                <div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-secondary text-sm font-bold uppercase tracking-[0.4em] mb-6 block"
                  >
                    {t.about_subtitle}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-headline font-bold leading-tight"
                  >
                    {t.about_title}
                  </motion.h2>
                </div>

                <div className="space-y-8 text-white/50 text-xl leading-relaxed font-light">
                  <p>{t.about_p1}</p>
                  <p>{t.about_p2}</p>
                  <p>{t.about_p3}</p>
                </div>

                <div className="grid grid-cols-2 gap-12 pt-8">
                  <div>
                    <AnimatedCounter end={4} suffix="+" className="text-5xl font-headline font-bold text-primary mb-2" />
                    <div className="text-xs uppercase text-white/30 tracking-[0.3em] font-bold">{t.about_stat_1}</div>
                  </div>
                  <div>
                    <AnimatedCounter end={15} suffix="+" className="text-5xl font-headline font-bold text-secondary mb-2" />
                    <div className="text-xs uppercase text-white/30 tracking-[0.3em] font-bold">{t.about_stat_2}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-32 relative">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-card p-12 md:p-24 rounded-[3rem] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-radial from-primary/5 to-transparent opacity-50" />
              <div className="relative z-10 grid md:grid-cols-2 gap-24">
                <div className="space-y-12">
                  <h2 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter leading-[0.9]">
                    {t.contact_title}
                  </h2>
                  <p className="text-white/50 text-2xl font-light leading-relaxed">
                    {t.contact_desc}
                  </p>
                  <div className="flex flex-col gap-8">
                    <a href="mailto:ariadnart2005@gmail.com" className="group flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all duration-500">
                        <Mail size={28} />
                      </div>
                      <div>
                        <div className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{t.contact_mail}</div>
                        <div className="text-2xl font-headline font-bold">ariadnart2005@gmail.com</div>
                      </div>
                    </a>
                    <div className="flex gap-6">
                      <a href="#" className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Linkedin size={28} />
                      </a>
                      <a href="#" className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Github size={28} />
                      </a>
                    </div>
                  </div>
                </div>

                <form className="space-y-8" onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                  const originalText = submitBtn.textContent;
                  submitBtn.disabled = true;
                  submitBtn.textContent = activeLang === 'es' ? 'Enviando...' : 'Sending...';

                  try {
                    await emailjs.sendForm(
                      import.meta.env.VITE_EMAILJS_SERVICE_ID,
                      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                      form,
                      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                    );
                    alert(activeLang === 'es'
                      ? '¡Mensaje enviado correctamente! Te responderé lo antes posible.'
                      : 'Message sent successfully! I will reply as soon as possible.');
                    form.reset();
                  } catch (error) {
                    console.error('EmailJS error:', error);
                    alert(activeLang === 'es'
                      ? 'Error al enviar el mensaje. Por favor, envía un email directamente a ariadnart2005@gmail.com'
                      : 'Error sending message. Please email directly to ariadnart2005@gmail.com');
                  } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                  }
                }}>
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-[0.3em] text-white/30 font-bold">{t.form_name}</label>
                    <input name="from_name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl focus:border-primary outline-none transition-all placeholder:text-white/10" placeholder="John Doe" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-[0.3em] text-white/30 font-bold">Email</label>
                    <input name="from_email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl focus:border-primary outline-none transition-all placeholder:text-white/10" placeholder="john@company.com" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-[0.3em] text-white/30 font-bold">{t.form_message}</label>
                    <textarea name="message" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl focus:border-primary outline-none transition-all resize-none placeholder:text-white/10" placeholder={activeLang === 'es' ? 'Describe tu visión...' : 'Describe your vision...'} />
                  </div>
                  <button type="submit" className="btn-primary w-full py-6 text-xl">
                    {t.form_btn}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="text-3xl font-headline font-bold tracking-tighter">Ariadna Ramos</div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/30 font-bold">{t.footer_tag}</p>
          </div>
          <div className="flex gap-12 text-xs uppercase tracking-widest font-bold text-white/30">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#proyectos" className="hover:text-primary transition-colors">Projects</a>
            <a href="#sobre-mi" className="hover:text-primary transition-colors">About</a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">© 2024. {t.footer_copy}</p>
        </div>
      </footer>

      <ChatbotDemo 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        title={demoTitle} 
        context={demoContext} 
      />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
