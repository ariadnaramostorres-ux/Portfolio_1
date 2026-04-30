import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

// Middleware con CORS habilitado
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Obtener directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta del archivo JSON donde se almacenan los correos
const CONTACTS_FILE = path.join(__dirname, 'contacts.json');

// Crear archivo si no existe
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2));
}

// Endpoint para recibir nuevos contactos
app.post('/api/contacts', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8'));

    const newContact = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString(),
      status: 'new'
    };

    contacts.push(newContact);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));

    console.log(`✅ Nuevo mensaje de ${name} (${email})`);

    res.status(201).json({
      success: true,
      message: 'Mensaje guardado correctamente',
      contact: newContact
    });
  } catch (error: any) {
    console.error('Error al guardar contacto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para obtener todos los contactos
app.get('/api/contacts', (req, res) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8'));
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer contactos' });
  }
});

// Endpoint para ver contactos en el navegador
app.get('/admin/contacts', (req, res) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8'));

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Panel de Contactos - Ariadna Ramos</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; background: #0a0a0a; color: #fff; padding: 2rem; }
          .container { max-width: 1200px; margin: 0 auto; }
          h1 { font-size: 2rem; margin-bottom: 2rem; background: linear-gradient(135deg, #00f2ff, #7000ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
          .stat-card { background: #141a2b; padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.1); }
          .stat-card h3 { font-size: 0.8rem; color: #666; margin-bottom: 0.5rem; }
          .stat-card .value { font-size: 2rem; font-weight: bold; color: #00f2ff; }
          table { width: 100%; border-collapse: collapse; background: #0c0f1a; border-radius: 1rem; overflow: hidden; }
          th, td { padding: 1rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); }
          th { background: #141a2b; font-weight: 600; }
          tr:hover { background: #141a2b; }
          .badge { padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
          .badge-new { background: #00f2ff; color: #000; }
          .empty { text-align: center; padding: 4rem; color: #666; }
          .btn-refresh { position: fixed; top: 2rem; right: 2rem; padding: 0.75rem 1.5rem; background: #00f2ff; color: #000; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; }
          .btn-refresh:hover { background: #00b8c4; }
        </style>
      </head>
      <body>
        <div class="container">
          <button class="btn-refresh" onclick="location.reload()">🔄 Actualizar</button>
          <h1>📬 Panel de Contactos</h1>
          <div class="stats">
            <div class="stat-card">
              <h3>Total Mensajes</h3>
              <div class="value">${contacts.length}</div>
            </div>
            <div class="stat-card">
              <h3>Nuevos</h3>
              <div class="value">${contacts.filter((c: any) => c.status === 'new').length}</div>
            </div>
          </div>
          ${contacts.length === 0 ? '<div class="empty"><h2>No hay mensajes todavía</h2></div>' : `<table><thead><tr><th>Fecha</th><th>Nombre</th><th>Email</th><th>Mensaje</th><th>Estado</th></tr></thead><tbody>${contacts.reverse().map((contact: any) => `<tr><td>${new Date(contact.date).toLocaleDateString('es-ES')}</td><td><strong>${contact.name}</strong></td><td><a href="mailto:${contact.email}" style="color: #00f2ff;">${contact.email}</a></td><td>${contact.message}</td><td><span class="badge badge-new">${contact.status}</span></td></tr>`).join('')}</tbody></table>`}
        </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar el panel' });
  }
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║  🚀 Servidor de Contactos Activo            ║
║  📧 API: http://localhost:${PORT}/api/contacts  ║
║  📬 Panel: http://localhost:${PORT}/admin/contacts║
╚══════════════════════════════════════════════╝
  `);
});
