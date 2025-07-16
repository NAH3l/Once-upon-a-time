# Once Upon a Time 📚

Une application web interactive pour écrire des histoires dans un format de livre ouvert, avec un système de logging en temps réel.

## 🎯 Description

"Once Upon a Time" est une application web qui simule l'expérience d'écriture dans un livre ouvert. L'interface présente deux zones de texte côte à côte, comme les pages d'un livre, permettant aux utilisateurs d'écrire leurs histoires dans un environnement immersif.


3. Démarrez le serveur de développement :
```bash
deno run --allow-read --allow-net .\script\main_page.ts```

4. Ouvrez votre navigateur et allez sur `http://localhost:8000/style/main_page.html`

## 🛠️ Structure du Projet

```
Once-upon-a-time/
├── image/
│   └── main_page_background.jpg
├── script/
│   ├── deno.json          # Configuration Deno
│   ├── deno.lock          # Verrouillage des dépendances
│   ├── main_page.ts       # Serveur principal
│   └── main_page_client.js # Logique côté client
├── style/
│   ├── main_page.css      # Styles CSS
│   └── main_page.html     # Page HTML principale
├── once upon a time.drawio # Diagramme du projet
├── README.md              # Ce fichier
└── todo.txt              # Liste des tâches à faire
```

## 🔧 API Endpoints

Le serveur expose plusieurs endpoints REST :

- `POST /api/log-textarea` - Envoyer un log de text-area
- `GET /api/logs` - Récupérer tous les logs
- `POST /api/clear-logs` - Effacer tous les logs

