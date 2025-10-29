# 🚀 Démarrage de l'Environnement de Développement (P0)

Ce guide fournit toutes les étapes nécessaires pour installer les outils requis et lancer l'intégralité de l'architecture de microservices (Rasa Backend, Action Server, PostgreSQL, Elasticsearch, et Frontend React) en utilisant **Docker Compose**.

## 🛠️ Prérequis : Installer les Outils

Vous avez besoin de trois outils de base pour démarrer le projet. L'installation est simple et gratuite.

### 1\. Git (Système de Versionnement)

Git est essentiel pour télécharger le code et enregistrer vos modifications.

| Système d'Exploitation | Instructions |
| :--- | :--- |
| **Windows** | Téléchargez l'installeur depuis [git-scm.com](https://git-scm.com/download/win) et suivez les étapes. Conservez les options par défaut. |
| **macOS** | Le plus simple est d'installer les Outils de Ligne de Commande XCode en ouvrant votre Terminal et en tapant : `xcode-select --install` |
| **Linux (Debian/Ubuntu)** | Ouvrez le Terminal et tapez : `sudo apt update && sudo apt install git` |

> **Vérification :** Ouvrez votre terminal (ou l'invite de commande) et tapez `git --version`. Si un numéro de version s'affiche, c'est bon.

### 2\. Docker Desktop (Conteneurisation)

Docker est l'outil clé qui garantit que l'environnement de chaque membre de l'équipe est identique.

1.  **Téléchargement :** Téléchargez et installez **Docker Desktop** depuis le site officiel de [Docker](https://www.docker.com/products/docker-desktop/).
2.  **Lancement :** Une fois installé, **lancez Docker Desktop**. Une icône doit apparaître dans votre barre des tâches/menu. **Docker doit être actif** avant de pouvoir exécuter les commandes `docker-compose`.

### 3\. Node.js (Pour le Frontend React)

Node.js est nécessaire pour installer les dépendances et lancer le serveur de développement du Frontend React.

1.  **Téléchargement :** Téléchargez l'installeur (version **LTS** recommandée) depuis [nodejs.org](https://nodejs.org/en/download/package-manager).
2.  **Installation :** Suivez les étapes de l'installeur.

> **Vérification :** Dans votre terminal, tapez `node -v` et `npm -v`. Si un numéro de version s'affiche pour les deux, Node.js est prêt.

-----

## 💻 Démarrage de l'Environnement Complet

Une fois que Git, Docker Desktop (actif) et Node.js sont installés, vous êtes prêt à lancer tout le projet avec seulement trois commandes.

### Étape 1 : Cloner le Dépôt

Ouvrez votre terminal et choisissez l'endroit où vous voulez placer le projet.

```bash
# Téléchargez le code complet dans un dossier local
git clone https://github.com/ismailtj/assistant-virtuel-educatif.git
cd assistant-virtuel-educatif
```

### Étape 2 : Entraîner l'IA (Rasa)

Cette commande va utiliser le conteneur **Rasa** pour installer toutes les dépendances Python, valider les configurations, télécharger le modèle d'IA multilingue (**LaBSE**) et entraîner le modèle conversationnel.

> **ATTENTION :** Cette étape est la plus longue (peut prendre plusieurs minutes) car elle télécharge un grand modèle d'IA. Elle doit être exécutée avec succès la première fois, ou après chaque modification des fichiers `.yml`.

```bash
# Entraîne le modèle NLU/Core à l'intérieur du conteneur Docker
docker-compose run rasa train --force
```

### Étape 3 : Lancer l'Infrastructure (Backend)

Cette commande démarre tous les serveurs du backend en arrière-plan (mode détaché : `-d`).

```bash
# Démarre PostgreSQL, Elasticsearch, Rasa Core, et l'Action Server
docker-compose up -d
```

> **Vérification :** Après quelques secondes, vérifiez que tous les services sont actifs.
>
> ```bash
> docker-compose ps
> ```
>
> Le statut des quatre services (`db`, `es`, `action_server`, `rasa`) doit être **`Up`**.

### Étape 4 : Lancer le Frontend (Interface Utilisateur)

Nous allons maintenant démarrer le serveur de développement React pour l'interface de chat.

1.  **Déplacez-vous dans le dossier Frontend :**
    ```bash
    cd chatbot-frontend
    ```
2.  **Installer les dépendances React (une seule fois) :**
    ```bash
    npm install
    ```
3.  **Démarrer l'application web :**
    ```bash
    npm start
    ```

Votre navigateur devrait s'ouvrir automatiquement sur **`http://localhost:3000`**. Le chat est maintenant connecté à l'API Rasa sur le port `5005` et est prêt pour le développement du Sprint 1.

-----

**Prochaine Étape :** Commencer le développement de nouvelles fonctionnalités dans les dépôts `chatbot-frontend`, `chatbot-rasa-backend` et `chatbot-action-server`.