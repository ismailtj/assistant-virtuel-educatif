# Dockerfile Rasa Backend

# Image de base officielle de Rasa
FROM rasa/rasa:3.6.0-full

# Copie des fichiers de configuration
COPY . /app

# Installe les dépendances Python supplémentaires (si le pipeline NLP utilise spaCy/Transformers)
RUN pip install -r requirements.txt

# Définit le répertoire de travail
WORKDIR /app