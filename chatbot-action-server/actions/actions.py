from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import psycopg2 # Import du pilote PostgreSQL

# Configuration de la BDD (identiques à celles du docker-compose.yml et endpoints.yml)
DB_HOST = "db"
DB_NAME = "rasa_db"
DB_USER = "user"
DB_PASS = "password"

# Classe de l'action personnalisée pour obtenir les horaires
class ActionGetHoraires(Action):

    def name(self) -> Text:
        # Le nom de l'action DOIT correspondre à celui dans domain.yml
        return "action_get_horaires"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # 1. Tente d'établir la connexion à PostgreSQL
        try:
            conn = psycopg2.connect(
                host=DB_HOST,
                database=DB_NAME,
                user=DB_USER,
                password=DB_PASS
            )
            cur = conn.cursor()

            # 2. Exécute la requête SQL
            # Pour l'instant, on cherche juste l'info 'Horaires' pour 'Scolarite'
            sql_query = """
            SELECT information FROM campus_info 
            WHERE theme = 'Horaires' AND sous_theme = 'Scolarite';
            """
            cur.execute(sql_query)
            
            # Récupère le résultat
            result = cur.fetchone()
            
            # 3. Traitement du résultat
            if result:
                # Le résultat est un tuple, on prend le premier élément (la colonne 'information')
                horaires = result[0] 
                response = f"Selon nos données, voici les horaires : {horaires}"
            else:
                response = "Désolé, je n'ai pas trouvé les horaires de la Scolarité dans la base de données."

            # 4. Ferme la connexion
            cur.close()
            conn.close()

        except Exception as e:
            # En cas d'erreur de connexion ou de requête
            print(f"Erreur BDD: {e}")
            response = "Désolé, une erreur technique m'empêche de consulter les horaires en ce moment. Veuillez réessayer plus tard."

        # 5. Envoie la réponse à l'utilisateur
        dispatcher.utter_message(text=response)

        return []
