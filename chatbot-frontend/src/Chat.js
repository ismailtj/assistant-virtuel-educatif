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
      // 1. Appel à l'API Rasa sur le port 5005
      const response = await fetch(RASA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: 'moi', message: input }),
      });

      const data = await response.json();

      // 2. Affichage des réponses de Rasa
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
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', border: '1px solid #ccc' }}>
      <h1>Assistant Virtuel ESIC</h1>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #eee', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', marginBottom: '10px' }}>
            <span style={{ 
                background: msg.sender === 'user' ? '#007bff' : '#f1f1f1', 
                color: msg.sender === 'user' ? 'white' : 'black',
                padding: '8px', 
                borderRadius: '10px',
                display: 'inline-block'
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tapez votre message..."
          style={{ width: 'calc(100% - 70px)', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', width: '60px' }}>Envoyer</button>
      </form>
    </div>
  );
}

export default Chat;