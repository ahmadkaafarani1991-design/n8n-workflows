import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Setup JARVIS event listeners
    if (window.jarvis) {
      window.jarvis.onVoiceRecognized((data) => {
        handleVoiceInput(data);
      });

      window.jarvis.onStatusChange((status) => {
        console.log('Status:', status);
      });
    }

    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVoiceInput = async (text) => {
    setTranscript('');
    const result = await window.jarvis.processText(text);
    
    if (result.success) {
      addMessage('user', text);
      addMessage('assistant', result.data.response);
      setIsSpeaking(true);
      await window.jarvis.speak(result.data.response);
      setIsSpeaking(false);
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');

    const result = await window.jarvis.processText(userText);
    
    if (result.success) {
      addMessage('user', userText);
      addMessage('assistant', result.data.response);
      setIsSpeaking(true);
      await window.jarvis.speak(result.data.response);
      setIsSpeaking(false);
    }
  };

  const toggleVoice = async () => {
    if (isListening) {
      await window.jarvis.stopVoiceRecognition();
      setIsListening(false);
    } else {
      const result = await window.jarvis.startVoiceRecognition();
      if (result.success) {
        setIsListening(true);
      }
    }
  };

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender,
      text,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="jarvis-title">
            <span className="jarvis-letter">J</span>
            <span className="jarvis-letter">A</span>
            <span className="jarvis-letter">R</span>
            <span className="jarvis-letter">V</span>
            <span className="jarvis-letter">I</span>
            <span className="jarvis-letter">S</span>
          </h1>
          <p className="subtitle">Personal AI Assistant</p>
        </div>
        <div className="status-indicator">
          <div className={`status-dot ${isListening ? 'listening' : 'idle'}`}></div>
          <span className="status-text">
            {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Ready'}
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        {/* Chat area */}
        <div className="chat-container">
          <div className="messages">
            {messages.length === 0 ? (
              <div className="welcome">
                <h2>Welcome, Sir</h2>
                <p>How may I assist you today?</p>
                <div className="suggestions">
                  <button onClick={() => setInput('What is the weather?')}>
                    Weather
                  </button>
                  <button onClick={() => setInput('What time is it?')}>
                    Time
                  </button>
                  <button onClick={() => setInput('Tell me a joke')}>
                    Joke
                  </button>
                  <button onClick={() => setInput('Help')}>
                    Help
                  </button>
                </div>
              </div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <div className="message-content">
                    <div className="message-text">{msg.text}</div>
                    <div className="message-time">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Interim transcript display */}
          {transcript && (
            <div className="interim-transcript">
              <span className="listening-indicator">🎤</span>
              {transcript}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="input-area">
          <form onSubmit={handleTextSubmit} className="input-form">
            <input
              type="text"
              className="text-input"
              placeholder="Type or press the microphone button to speak..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isListening}
            />
            <button
              type="button"
              className={`voice-button ${isListening ? 'active' : ''}`}
              onClick={toggleVoice}
              title={isListening ? 'Stop listening' : 'Start listening'}
            >
              🎤
            </button>
            <button
              type="submit"
              className="send-button"
              disabled={!input.trim() || isListening}
              title="Send message"
            >
              ➤
            </button>
          </form>
          <div className="help-text">
            Press the microphone button to speak, or type your message and press enter
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>JARVIS v1.0.0 | Personal AI Desktop Assistant</p>
      </footer>
    </div>
  );
}

export default App;
