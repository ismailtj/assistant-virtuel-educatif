// Fichier : chatbot-frontend/src/Chat.js

import React, { useState } from 'react';

const RASA_API_URL = 'http://localhost:5005/webhooks/rest/webhook';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Fonction pour envoyer un message à Rasa
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Appel à l'API Rasa
      const response = await fetch(RASA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: 'moi', message: input }),
      });

      const data = await response.json();

      // Affichage des réponses de Rasa
      const rasaResponses = data.map(msg => ({ 
        sender: 'bot', 
        text: msg.text 
      }));
      setMessages((prevMessages) => [...prevMessages, ...rasaResponses]);

    } catch (error) {
      console.error("Erreur lors de la communication avec Rasa:", error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'error', text: "Erreur de connexion. Vérifiez le serveur Rasa." }]);
    }

    setInput('');
  };

  return (
    <div style={{ 
        padding: '20px', 
        maxWidth: '500px', 
        margin: '20px auto', 
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
      }}>
      <h2 style={{ textAlign: 'center', color: '#0056b3' }}>Assistant Virtuel ESIC 🎓</h2>
      
      {/* Fenêtre de Messages */}
      <div style={{ 
          height: '400px', 
          overflowY: 'auto', 
          border: '1px solid #ddd', 
          borderRadius: '5px',
          padding: '10px',
          marginBottom: '15px',
          backgroundColor: '#f9f9f9'
        }}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            style={{ 
              textAlign: msg.sender === 'user' ? 'right' : 'left', 
              marginBottom: '15px' 
            }}
          >
            <span style={{ 
                background: msg.sender === 'user' ? '#007bff' : '#e0e0e0', 
                color: msg.sender === 'user' ? 'white' : '#333',
                padding: '10px 15px', 
                borderRadius: '18px',
                borderTopRightRadius: msg.sender === 'user' ? '3px' : '18px',
                borderTopLeftRadius: msg.sender === 'user' ? '18px' : '3px',
                display: 'inline-block',
                maxWidth: '80%',
                wordWrap: 'break-word',
                fontSize: '14px'
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      
      {/* Formulaire d'Envoi */}
      <form onSubmit={sendMessage} style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..."
          style={{ flexGrow: 1, padding: '10px', borderRadius: '5px 0 0 5px', border: '1px solid #ddd' }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '10px 15px', 
            width: '100px', 
            backgroundColor: '#0056b3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0 5px 5px 0', 
            cursor: 'pointer' 
          }}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Chat;