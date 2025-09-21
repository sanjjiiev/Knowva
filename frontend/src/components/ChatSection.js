import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Explain a concept",
    "Generate practice problems", 
    "Start revision session",
    "Help with homework",
    "Study tips"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message, type = "user") => {
    setMessages(prev => [
      ...prev,
      { id: Date.now() + Math.random(), message, type, timestamp: Date.now() }
    ]);
  };

  const fetchAIResponse = async (message) => {
    try {
      setIsTyping(true);

      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      // Add AI responses
      handleSendMessage(`Explanation:\n${data.explanation}`, "ai");
      handleSendMessage(`Practice Questions:\n${data.practice}`, "ai");
      handleSendMessage(`Revision:\n${data.revision}`, "ai");

    } catch (error) {
      console.error(error);
      handleSendMessage("Error fetching AI response", "ai");
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    handleSendMessage(inputValue, "user");
    fetchAIResponse(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    handleSendMessage(reply, "user");
    fetchAIResponse(reply);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

 return (
    <div className="card">
      <div className="chat-container">
        <div className="chat-header">
          <h3>AI Learning Assistant</h3>
          <span className="status status--success">Online</span>
        </div>

        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message message--${msg.type}`}>
              <div className="message-content">
                {msg.type === 'ai' ? (
                  <ReactMarkdown>{msg.message}</ReactMarkdown>
                ) : (
                  msg.message
                )}
              </div>
              <div className="message-time">{formatTime(msg.timestamp)}</div>
            </div>
          ))}

          {isTyping && (
            <div className="message message--ai">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-section">
          <div className="quick-replies">
            {quickReplies.map((reply, index) => (
              <button 
                key={index}
                className="btn btn--sm btn--secondary quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="chat-input-container">
            <textarea
              className="form-control chat-input"
              placeholder="Ask me anything about your studies..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="2"
            />
            <button 
              className="btn btn--primary send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
