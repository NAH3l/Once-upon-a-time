// Classe pour gérer les logs des text-areas
class TextAreaLogger {
  constructor() {
    this.logs = [];
    this.initializeTextAreas();
  }

  initializeTextAreas() {
    const pageLeft = document.getElementById('page_left');
    const pageRight = document.getElementById('page_right');

    if (pageLeft) {
      pageLeft.addEventListener('input', (event) => {
        this.logTextAreaContent('page_left', event.target.value);
      });
    }

    if (pageRight) {
      pageRight.addEventListener('input', (event) => {
        this.logTextAreaContent('page_right', event.target.value);
      });
    }
  }

  logTextAreaContent(textAreaId, content) {
    const log = {
      timestamp: new Date(),
      textAreaId,
      content
    };

    this.logs.push(log);
    
    // Affichage dans la console côté client
    console.log(`[CLIENT] [${log.timestamp.toLocaleTimeString()}] ${textAreaId}:`, content);
    console.log('[CLIENT] Log complet:', log);
    
    // Envoyer le log au serveur
    this.sendLogToServer(textAreaId, content);
  }

  // Méthode pour envoyer le log au serveur
  async sendLogToServer(textAreaId, content) {
    try {
      const response = await fetch('/api/log-textarea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textAreaId,
          content
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('[CLIENT] Log envoyé au serveur avec succès');
      } else {
        console.error('[CLIENT] Erreur lors de l\'envoi au serveur:', result.error);
      }
    } catch (error) {
      console.error('[CLIENT] Erreur de connexion au serveur:', error);
    }
  }

  // Méthode pour récupérer tous les logs côté serveur
  async getServerLogs() {
    try {
      const response = await fetch('/api/logs');
      const result = await response.json();
      
      if (result.success) {
        console.log('[CLIENT] Logs côté serveur:', result.logs);
        console.log('[CLIENT] Nombre total de logs côté serveur:', result.count);
        return result.logs;
      } else {
        console.error('[CLIENT] Erreur lors de la récupération des logs:', result.error);
        return [];
      }
    } catch (error) {
      console.error('[CLIENT] Erreur de connexion au serveur:', error);
      return [];
    }
  }

  // Méthode pour effacer les logs côté serveur
  async clearServerLogs() {
    try {
      const response = await fetch('/api/clear-logs', {
        method: 'POST'
      });
      const result = await response.json();
      
      if (result.success) {
        console.log('[CLIENT] Logs côté serveur effacés');
      } else {
        console.error('[CLIENT] Erreur lors de l\'effacement des logs:', result.error);
      }
    } catch (error) {
      console.error('[CLIENT] Erreur de connexion au serveur:', error);
    }
  }

  // Méthode pour récupérer tous les logs côté client
  getLogs() {
    return [...this.logs];
  }

  // Méthode pour récupérer les logs d'un text-area spécifique côté client
  getLogsByTextArea(textAreaId) {
    return this.logs.filter(log => log.textAreaId === textAreaId);
  }

  // Méthode pour effacer les logs côté client
  clearLogs() {
    this.logs = [];
    console.log('[CLIENT] Logs côté client effacés');
  }
}

// Initialisation du logger quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  const logger = new TextAreaLogger();
  
  // Exposer le logger globalement pour debug (optionnel)
  window.textAreaLogger = logger;
  
  console.log('Méthodes disponibles:');
  console.log('  logger.getLogs() - Récupérer les logs côté client');
  console.log('  logger.getServerLogs() - Récupérer les logs côté serveur');
  console.log('  logger.clearLogs() - Effacer les logs côté client');
  console.log('  logger.clearServerLogs() - Effacer les logs côté serveur');
}); 