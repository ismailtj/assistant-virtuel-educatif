# Dockerfile Action Server

# Image de base Python léger
FROM python:3.10-slim

# Installer quelques paquets système souvent requis pour compiler des dépendances
RUN apt-get update && apt-get install -y --no-install-recommends \
		build-essential gcc git curl libpq-dev \
	&& rm -rf /var/lib/apt/lists/*

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier le code
COPY . /app

# Mettre à jour pip/wheel et installer une version de setuptools compatible
# (certaines dépendances du projet attendent setuptools<70.4.0)
RUN python -m pip install --upgrade pip wheel && \
		python -m pip install "setuptools>=70.3.0,<70.4.0"

# Installer les dépendances Python
RUN pip install -r requirements.txt