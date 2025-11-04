# Fichier : chatbot-action-server/actions/actions.py

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

# Importations SQLAlchemy
from sqlalchemy import create_engine, text 

# Configuration de la BDD via une URL de connexion
# Le format de l'URL est standard : dialect+driver://user:pass@host:port/dbname
DB_URL = "postgresql://user:password@db:5432/rasa_db" 
engine = create_engine(DB_URL) # Crée le moteur de connexion une seule fois

# Classe de l'action personnalisée pour obtenir les horaires
class ActionGetHoraires(Action):

    def name(self) -> Text:
        return "action_get_horaires"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        response = ""
        
        # 1. Utilise l'Engine pour se connecter et exécuter la requête
        try:
            with engine.connect() as connection:
                # 2. Exécute la requête SQL. Notez l'utilisation de 'text()' pour la portabilité
                sql_query = text("""
                    SELECT information FROM campus_info 
                    WHERE theme = 'Horaires' AND sous_theme = 'Scolarite';
                """)
                
                result = connection.execute(sql_query).fetchone()

                # 3. Traitement du résultat
                if result:
                    # Le résultat est maintenant un RowProxy, on accède par index
                    horaires = result[0] 
                    response = f"Selon nos données (via SQLAlchemy), voici les horaires : {horaires}"
                else:
                    response = "Désolé, je n'ai pas trouvé les horaires de la Scolarité dans la base de données."

        except Exception as e:
            # En cas d'erreur de connexion ou de requête
            print(f"Erreur SQLAlchemy BDD: {e}")
            response = "Désolé, une erreur technique m'empêche de consulter les horaires en ce moment. Veuillez réessayer plus tard."

        # 4. Envoie la réponse à l'utilisateur
        dispatcher.utter_message(text=response)

        return []