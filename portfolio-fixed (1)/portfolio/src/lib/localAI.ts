// Sistema de IA local - Chatbots únicos por proyecto

interface KnowledgeBase {
  keywords: string[];
  response: string;
}

interface ProjectChatbot {
  name: string;
  greeting: string;
  knowledgeBase: KnowledgeBase[];
  defaultResponse: string;
}

const chatbots: Record<string, ProjectChatbot> = {
  'Correos Express AI': {
    name: 'Correos Express AI',
    greeting: '¡Hola! 📦 Soy el asistente virtual de Correos Express. Puedo ayudarte a consultar el estado de tu paquete, resolver incidencias de envío y mucho más. ¿En qué puedo ayudarte?',
    knowledgeBase: [
      {
        keywords: ['hola', 'hi', 'hey', 'buenas'],
        response: '¡Hola! 👋 Soy el asistente de Correos Express. ¿Necesitas ayuda con algún envío o paquete?'
      },
      {
        keywords: ['paquete', 'envío', 'envio', 'seguimiento', 'tracking', 'dónde', 'donde', 'estado'],
        response: '📦 **Seguimiento de Paquetes:**\n\nPara consultar tu paquete necesito:\n• Número de seguimiento\n• Fecha de envío\n\nTambién puedo ayudarte con:\n• Cambios de dirección\n• Reenvíos a otra ubicación\n• Información de entrega estimada\n\n¿Qué necesitas saber?'
      },
      {
        keywords: ['retraso', 'tarda', 'lento', 'demora', 'retrasado'],
        response: '⏱️ **Incidencias de Retraso:**\n\nLamento que tu envío esté retrasado. Las causas pueden ser:\n\n• Tráfico elevado en la zona\n• Condiciones meteorológicas\n• Dirección incorrecta\n\n**Solución inmediata:** Puedo priorizar tu envío o reprogramar la entrega para mañana. ¿Prefieres alguna de estas opciones?'
      },
      {
        keywords: ['precio', 'coste', 'cuánto', 'cuanto', 'tarifa'],
        response: '💰 **Tarifas de Correos Express:**\n\n• **Nacional estándar:** 4.99€ (24-48h)\n• **Nacional urgente:** 7.99€ (24h)\n• **Internacional UE:** 12.99€ (3-5 días)\n• **Internacional mundial:** 19.99€ (5-10 días)\n\n¿Necesitas calcular un envío específico?'
      },
      {
        keywords: ['incidencia', 'problema', 'error', 'no llega', 'perdido'],
        response: '⚠️ **Resolución de Incidencias:**\n\nVeo que hay un problema con tu envío. Puedo:\n\n1️⃣ Abrir una investigación del paquete\n2️⃣ Reprogramar entrega en nueva fecha\n3️⃣ Cambiar punto de recogida\n4️⃣ Solicitar reembolso si se considera perdido\n\n¿Cuál es tu número de seguimiento para localizar tu envío?'
      },
      {
        keywords: ['recoger', 'oficina', 'punto', 'agencia'],
        response: '🏢 **Puntos de Recogida:**\n\nTu paquete estará disponible en:\n• Oficinas Correos Express más cercana\n• Puntos lockers (24h disponibles)\n• Agencias colaboradoras\n\nRecibirás un SMS cuando esté listo. ¿Necesitas cambiar el punto de recogida?'
      },
      {
        keywords: ['devolver', 'devolución', 'devolucion', 'reembolso'],
        response: '🔄 **Política de Devoluciones:**\n\n• **Plazo:** 14 días naturales desde la entrega\n• **Estado:** Producto sin abrir\n• **Proceso:** Genero etiqueta de devolución gratuita\n\n¿Quieres que genere una etiqueta de devolución ahora?'
      }
    ],
    defaultResponse: '📦 No tengo información específica sobre esa consulta. Como asistente de Correos Express puedo ayudarte con:\n\n• Seguimiento de paquetes\n• Incidencias de envío\n• Tarifas y servicios\n• Cambios de dirección\n• Devoluciones\n\n¿Necesitas ayuda con algo de esto?'
  },

  'SEUR Smart Logistics': {
    name: 'SEUR Smart Logistics',
    greeting: '¡Hola! 🚚 Soy el asistente inteligente de SEUR Smart Logistics. Estoy aquí para ayudarte con optimización de rutas, gestión de flotas y predicción de demanda. ¿Qué necesitas?',
    knowledgeBase: [
      {
        keywords: ['hola', 'hi', 'hey', 'buenas'],
        response: '¡Hola! 👋 Soy el asistente de SEUR Smart Logistics. ¿En qué puedo ayudarte hoy?'
      },
      {
        keywords: ['ruta', 'rutas', 'optimización', 'optimizacion', 'camino', 'recorrido'],
        response: '🗺️ **Optimización de Rutas:**\n\nNuestro sistema predictivo analiza:\n\n• Tráfico en tiempo real\n• Condiciones meteorológicas\n• Volumen de paquetes por zona\n• Ventanas horarias de entrega\n\n**Resultado:** Hasta un 30% de mejora en eficiencia de entrega.\n\n¿Quieres simular una ruta específica o necesitas optimizar una flota completa?'
      },
      {
        keywords: ['flota', 'vehículos', 'vehiculos', 'camiones', 'reparto'],
        response: '🚛 **Gestión de Flota:**\n\nPuedo ayudarte con:\n\n• Asignación inteligente de vehículos\n• Mantenimiento predictivo\n• Consumo de combustible optimizado\n• Rutas multi-parada eficientes\n\n¿Cuántos vehículos tiene tu flota y qué tipo de entregas realizas?'
      },
      {
        keywords: ['demanda', 'predicción', 'prediccion', 'volumen', 'picos'],
        response: '📊 **Predicción de Demanda:**\n\nNuestro modelo PyTorch analiza:\n\n• Históricos de entregas\n• Estacionalidad y eventos\n• Patrones por zona geográfica\n• Tendencias de mercado\n\n**Precisión:** 92% en predicciones a 7 días.\n\n¿Para qué periodo necesitas la predicción?'
      },
      {
        keywords: ['última milla', 'ultima milla', 'last mile', 'entrega'],
        response: '🏠 **Gestión de Última Milla:**\n\nLa parte más crítica del proceso. Optimizamos:\n\n• Micro-rutas urbanas\n• Puntos de consolidación\n• Horarios de entrega inteligentes\n• Comunicación proactiva al cliente\n\n**Resultado:** -40% intentos fallidos, +30% entregas a primer intento.\n\n¿Qué volumen de entregas diarias gestionas?'
      },
      {
        keywords: ['precio', 'coste', 'cuánto', 'cuanto', 'tarifa', 'presupuesto'],
        response: '💰 **Servicios SEUR Smart Logistics:**\n\n• **Consultoría logística:** Desde 2.500€\n• **Implementación predictiva:** Desde 8.000€\n• **Optimización completa:** Desde 15.000€/año\n\nCada solución se personaliza según tu volumen y necesidades. ¿Quieres una evaluación gratuita de tu operación actual?'
      }
    ],
    defaultResponse: '🚚 No tengo información específica sobre esa consulta. Como asistente de SEUR Smart Logistics puedo ayudarte con:\n\n• Optimización de rutas\n• Gestión de flotas\n• Predicción de demanda\n• Última milla\n• Presupuesto personalizado\n\n¿Necesitas ayuda con alguno de estos temas?'
  },

  'Telefónica Neural Search': {
    name: 'Telefónica Neural Search',
    greeting: '¡Hola! 🔍 Soy el asistente de Telefónica Neural Search. Estoy especializado en resolver problemas de conectividad, configuración de red y búsqueda de documentación técnica. ¿Qué necesitas?',
    knowledgeBase: [
      {
        keywords: ['hola', 'hi', 'hey', 'buenas'],
        response: '¡Hola! 👋 Soy el asistente de Neural Search de Telefónica. ¿Tienes algún problema con tu conexión o necesitas documentación técnica?'
      },
      {
        keywords: ['internet', 'conexión', 'conexion', 'wifi', 'red', 'se va', 'lento', 'velocidad'],
        response: '🌐 **Problemas de Conexión:**\n\nVamos a diagnostic tu problema paso a paso:\n\n1️⃣ **¿El problema es por WiFi o cable?**\n2️⃣ **¿Afecta a todos los dispositivos?**\n3️⃣ **¿A qué distancia estás del router?**\n\n**Soluciones rápidas:**\n• Reinicia el router (espera 30 segundos)\n• Cambia el canal WiFi (evita interferencias)\n• Verifica que no haya demasiados dispositivos conectados\n\n¿Cuál es tu caso específico?'
      },
      {
        keywords: ['fibra', 'adsl', 'mbps', 'meges', 'velocidad', 'baja'],
        response: '📡 **Velocidad de Conexión:**\n\n**Velocidades contratadas vs reales:**\n\n• **Fibra 300Mb:** 280-310Mb esperados\n• **Fibra 600Mb:** 550-620Mb esperados\n• **Fibra 1Gb:** 900-950Mb esperados\n\n**Test recomendado:**\n• Conecta por cable Ethernet\n• Cierra todas las aplicaciones\n• Usa speedtest.net o fast.com\n\nSi obtienes menos del 80% de tu velocidad contratada, puedo abrir una incidencia técnica. ¿Cuál es tu velocidad contratada y qué resultado obtienes?'
      },
      {
        keywords: ['router', 'configurar', 'configuración', 'configuracion', 'puerto', 'dmz', 'nat'],
        response: '🔧 **Configuración del Router:**\n\nPuedo guiarte en:\n\n• **Apertura de puertos** (gaming, servidores)\n• **Configuración DMZ**\n• **Cambio de canales WiFi**\n• **Configuración NAT**\n• **Filtrado MAC**\n• **Redirección de puertos**\n\n¿Qué necesitas configurar específicamente?'
      },
      {
        keywords: ['factura', 'facturación', 'facturacion', 'cobro', 'cargo', 'importe'],
        response: '💳 **Consulta de Facturación:**\n\nPara revisar tu factura necesito:\n\n• Número de línea o DNI del titular\n• Mes que quieres consultar\n\nPuedo explicarte:\n• Desglose de servicios\n• Promociones aplicadas\n• Consumiciones adicionales\n• Próximos vencimientos\n\n¿Qué factura necesitas consultar?'
      },
      {
        keywords: ['documentación', 'documentacion', 'técnico', 'tecnico', 'manual', 'guía', 'guia'],
        response: '📚 **Búsqueda de Documentación Técnica:**\n\nNuestro sistema Neural Search procesa más de **10.000 documentos** al día con búsqueda semántica.\n\nPuedo buscar:\n• Manuales de configuración\n• Guías de resolución de averías\n• Documentación técnica de fibra/móvil\n• Procedimientos de instalación\n\n¿Qué documento o tema necesitas encontrar?'
      },
      {
        keywords: ['móvil', 'movil', 'cobertura', 'datos', 'roaming'],
        response: '📱 **Servicio Móvil:**\n\nPuedo ayudarte con:\n\n• **Cobertura:** Verifica en cobertura.telefonica.es\n• **Datos:** Consumo actual y límite\n• **Roaming:** Activación para viajes\n• **Portabilidad:** Cambiar manteniendo número\n• **Configuración APN:** Para datos móviles\n\n¿Qué problema tienes con tu línea móvil?'
      },
      {
        keywords: ['avería', 'averia', 'no funciona', 'roto', 'problema'],
        response: '🔴 **Reporte de Averías:**\n\nVoy a ayudarte a diagnosticar:\n\n**Si es fibra:**\n1. ¿Las luces del router están encendidas?\n2. ¿La luz PON es verde fija?\n3. ¿Todos los dispositivos fallan?\n\n**Si es móvil:**\n1. ¿Tienes cobertura?\n2. ¿Puedes hacer llamadas?\n3. ¿Los datos funcionan?\n\nSi tras verificar sigue sin funcionar, abro incidencia técnica con prioridad. ¿Qué tipo de servicio tienes afectado?'
      }
    ],
    defaultResponse: '🔍 No tengo información específica sobre esa consulta. Como asistente de Telefónica Neural Search puedo ayudarte con:\n\n• Problemas de conexión (WiFi, fibra, ADSL)\n• Configuración de router\n• Consultas de facturación\n• Servicio móvil y cobertura\n• Reporte de averías\n• Búsqueda de documentación técnica\n\n¿Cuál es tu problema?'
  }
};

function findBestResponse(chatbot: ProjectChatbot, message: string): string {
  const lowerMessage = message.toLowerCase();

  let bestMatch: KnowledgeBase | null = null;
  let bestScore = 0;

  for (const kb of chatbot.knowledgeBase) {
    let score = 0;
    for (const keyword of kb.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = kb;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }

  return chatbot.defaultResponse;
}

export function getGreeting(context: string): string {
  if (context.includes('Correos') || context.includes('correos')) {
    return chatbots['Correos Express AI'].greeting;
  } else if (context.includes('SEUR') || context.includes('seur')) {
    return chatbots['SEUR Smart Logistics'].greeting;
  } else if (context.includes('Telefónica') || context.includes('Telefonica') || context.includes('telefónica')) {
    return chatbots['Telefónica Neural Search'].greeting;
  }
  return chatbots['Correos Express AI'].greeting;
}

export async function chatWithAI(message: string, context: string): Promise<string> {
  console.log("Mensaje:", message);
  console.log("Contexto/Chatbot:", context);

  // Seleccionar el chatbot correcto según el contexto
  let selectedChatbot: ProjectChatbot;

  if (context.includes('Correos') || context.includes('correos')) {
    selectedChatbot = chatbots['Correos Express AI'];
  } else if (context.includes('SEUR') || context.includes('seur')) {
    selectedChatbot = chatbots['SEUR Smart Logistics'];
  } else if (context.includes('Telefónica') || context.includes('Telefonica') || context.includes('telefónica')) {
    selectedChatbot = chatbots['Telefónica Neural Search'];
  } else {
    // Por defecto usar el de Correos si no se reconoce
    selectedChatbot = chatbots['Correos Express AI'];
  }

  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));

  const response = findBestResponse(selectedChatbot, message);

  console.log("Respuesta:", response.substring(0, 50) + '...');
  return response;
}

export function analyzeText(text: string): { intent: string; sentiment: string; entities: string[] } {
  const lower = text.toLowerCase();

  const intentPatterns: [string[], string][] = [
    [['comprar', 'precio', 'coste', 'presupuesto', 'contratar', 'buy', 'price', 'cost'], 'Intención Comercial'],
    [['ayuda', 'problema', 'error', 'fallo', 'no funciona', 'help', 'issue', 'bug'], 'Solicitud de Soporte'],
    [['cómo', 'como', 'qué es', 'que es', 'explica', 'how', 'what is', 'explain'], 'Consulta Informativa'],
    [['hola', 'buenas', 'hey', 'hi', 'hello', 'buenos días'], 'Saludo / Social'],
    [['quiero', 'necesito', 'busco', 'want', 'need', 'looking for'], 'Expresión de Necesidad'],
    [['gracias', 'genial', 'perfecto', 'thanks', 'great', 'awesome'], 'Feedback Positivo'],
    [['mal', 'horrible', 'pésimo', 'bad', 'terrible', 'awful'], 'Queja'],
    [['proyecto', 'desarrollo', 'implementar', 'crear', 'project', 'develop', 'build'], 'Consulta Técnica'],
  ];

  let intent = 'Consulta General';
  for (const [keywords, label] of intentPatterns) {
    if (keywords.some(k => lower.includes(k))) {
      intent = label;
      break;
    }
  }

  const positiveWords = ['bien', 'genial', 'excelente', 'perfecto', 'bueno', 'increíble', 'fantástico', 'great', 'good', 'excellent', 'amazing', 'love', 'wonderful', 'gracias', 'thanks'];
  const negativeWords = ['mal', 'problema', 'error', 'fallo', 'horrible', 'pésimo', 'terrible', 'bad', 'awful', 'hate', 'worst', 'broken', 'fail'];

  let posScore = 0;
  let negScore = 0;
  for (const w of positiveWords) { if (lower.includes(w)) posScore++; }
  for (const w of negativeWords) { if (lower.includes(w)) negScore++; }

  let sentiment = 'Neutral';
  if (posScore > negScore) sentiment = 'Positivo';
  else if (negScore > posScore) sentiment = 'Negativo';

  const entityPatterns: [string[], string][] = [
    [['ia', 'inteligencia artificial', 'ai', 'artificial intelligence', 'machine learning', 'ml'], 'IA'],
    [['python', 'javascript', 'typescript', 'react', 'node', 'fastapi'], 'Programación'],
    [['chatbot', 'bot', 'asistente', 'assistant', 'agente', 'agent'], 'Chatbots'],
    [['datos', 'data', 'base de datos', 'database', 'sql', 'vector'], 'Datos'],
    [['web', 'frontend', 'backend', 'api', 'servidor', 'server'], 'Web'],
    [['rag', 'retrieval', 'embeddings', 'pinecone', 'langchain'], 'RAG'],
    [['empresa', 'negocio', 'company', 'business', 'startup'], 'Negocios'],
    [['diseño', 'design', 'ux', 'ui', 'interfaz', 'interface'], 'Diseño'],
    [['cloud', 'aws', 'gcp', 'azure', 'docker', 'kubernetes'], 'Cloud'],
    [['logística', 'logistica', 'envío', 'envio', 'delivery', 'logistics'], 'Logística'],
  ];

  const entities: string[] = [];
  for (const [keywords, label] of entityPatterns) {
    if (keywords.some(k => lower.includes(k))) {
      entities.push(label);
    }
  }

  if (entities.length === 0) {
    const words = text.split(/\s+/).filter(w => w.length > 4);
    entities.push(...words.slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));
  }

  return { intent, sentiment, entities: entities.slice(0, 5) };
}
