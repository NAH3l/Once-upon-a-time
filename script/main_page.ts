// Configuration du serveur
const port = 8000;

// Stockage des logs côté serveur
const serverLogs: Array<{
  timestamp: Date;
  textAreaId: string;
  content: string;
}> = [];

// Fonction pour logger côté serveur
function logTextAreaContent(textAreaId: string, content: string): void {
  const log = {
    timestamp: new Date(),
    textAreaId,
    content
  };
  
  serverLogs.push(log);
  console.log(`[SERVEUR] [${log.timestamp.toLocaleTimeString()}] ${textAreaId}:`, content);
  console.log('[SERVEUR] Log complet:', log);
}

// Gestionnaire principal du serveur
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  console.log(`Requête reçue: ${req.method} ${path}`);

  // API pour recevoir les logs des text-areas
  if (path === '/api/log-textarea' && req.method === 'POST') {
    try {
      const body = await req.json();
      const { textAreaId, content } = body;
      
      if (textAreaId && content !== undefined) {
        logTextAreaContent(textAreaId, content);
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Log reçu et enregistré côté serveur' 
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'textAreaId et content requis' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (_error) {
      return new Response(JSON.stringify({ 
        success: false, 
        _error: 'Erreur lors du traitement de la requête' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // API pour récupérer tous les logs côté serveur
  if (path === '/api/logs' && req.method === 'GET') {
    return new Response(JSON.stringify({
      success: true,
      logs: serverLogs,
      count: serverLogs.length
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // API pour effacer les logs côté serveur
  if (path === '/api/clear-logs' && req.method === 'POST') {
    serverLogs.length = 0;
    console.log('[SERVEUR] Logs effacés');
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Logs effacés côté serveur' 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Servir tous les autres fichiers statiques
  const { serveDir } = await import("jsr:@std/http@1/file-server");
  return serveDir(req, {
    fsRoot: ".",
    urlRoot: "",
  });
}

// Démarrage du serveur
console.log(`Serveur démarré sur http://localhost:${port}`);
console.log('[SERVEUR] API disponibles:');
console.log('  POST /api/log-textarea - Envoyer un log de text-area');
console.log('  GET  /api/logs - Récupérer tous les logs');
console.log('  POST /api/clear-logs - Effacer tous les logs');
Deno.serve({ port }, handler);