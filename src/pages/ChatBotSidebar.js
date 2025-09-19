// src/pages/ChatBotSidebar.js
import React, { useState, useRef, useEffect } from "react";

export default function ChatBotSidebar({ user }) {
  const [chats, setChats] = useState([
    { id: 1, title: "New Chat", messages: [{ sender: "bot", text: "Hi, how can I assist you today?" }] }
  ]);
  const [activeChat, setActiveChat] = useState(1);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        setInput(speechResult);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats.find(chat => chat.id === activeChat)?.messages]);

  const currentChat = () => {
    return chats.find(chat => chat.id === activeChat) || chats[0];
  };

  const updateChat = (newMessages) => {
    setChats(chats => 
      chats.map(chat => 
        chat.id === activeChat ? { ...chat, messages: newMessages } : chat
      )
    );
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "user", text: input };
    const newMessages = [...currentChat().messages, userMessage];
    updateChat(newMessages);
    setInput("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = { sender: "bot", text: input }; // Echo the user's input
      updateChat([...newMessages, botResponse]);
    }, 500);
  };

  const handleNewChat = () => {
    const newChatId = Date.now();
    setChats([...chats, { 
      id: newChatId, 
      title: `Chat ${chats.length + 1}`, 
      messages: [{ sender: "bot", text: "Hi, how can I assist you today?" }] 
    }]);
    setActiveChat(newChatId);
  };

  const toggleListening = () => {
    if (isListening) {
      // Stop listening and send the transcript
      recognitionRef.current.stop();
      setIsListening(false);
      if (transcript.trim()) {
        setInput(transcript);
        handleSend();
      }
    } else {
      // Start listening
      setTranscript("");
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Speech recognition start failed', error);
        setIsListening(false);
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      // Extract text from PPT (simulated - in reality you'd need a library)
      const content = extractTextFromPPT(e.target.result, file.name);
      
      // Add message about the uploaded file
      const userMessage = { sender: "user", text: `Uploaded PPT: ${file.name}` };
      const newMessages = [...currentChat().messages, userMessage];
      updateChat(newMessages);
      
      // Bot response with extracted text
      setTimeout(() => {
        const botResponse = { 
          sender: "bot", 
          text: `I've extracted the following content from your PPT:\n\n${content}` 
        };
        updateChat([...newMessages, botResponse]);
      }, 500);
    };
    
    if (file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      // For PPT files, we'll simulate content extraction
      reader.readAsArrayBuffer(file);
    }
  };

  // Simulated function to extract text from PPT
  const extractTextFromPPT = (fileData, fileName) => {
    // In a real application, you would use a library like pptx2json or similar
    // This is a simulation that creates sample content based on the filename
    
    const topics = [
      "Introduction", "Methodology", "Results", "Discussion", "Conclusion",
      "Literature Review", "Data Analysis", "Case Studies", "Future Work"
    ];
    
    const content = [
      `Presentation: ${fileName.replace('.pptx', '').replace('.ppt', '')}`,
      "",
      "Main Topics:",
      ...topics.slice(0, 3 + Math.floor(Math.random() * 4)).map(topic => `- ${topic}`),
      "",
      "Key Points:",
      "- This presentation discusses important concepts",
      "- It includes detailed analysis and findings",
      "- Recommendations are provided for future work",
      "",
      "Sample Content:",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,",
      "nisi vel consectetur interdum, nisl nisi aliquam nisi, euismod aliquam",
      "nisi nisi euismod nisi. Nullam euismod, nisi vel consectetur interdum,",
      "nisl nisi aliquam nisi, euismod aliquam nisi nisi euismod nisi."
    ];
    
    return content.join("\n");
  };

  return (
    <div className="flex h-full bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {/* Chat History Sidebar */}
      <div className="w-64 bg-gray-700 border-r border-gray-600 p-4 flex flex-col">
        <button 
          className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 flex items-center justify-center hover:bg-blue-700 transition"
          onClick={handleNewChat}
        >
          <span className="mr-2">+</span> New Chat
        </button>
        
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`p-3 rounded-lg mb-2 cursor-pointer ${activeChat === chat.id ? "bg-blue-500" : "hover:bg-gray-600"}`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="font-medium truncate text-white">{chat.title}</div>
              <div className="text-xs text-gray-300 truncate">
                {chat.messages[chat.messages.length - 1].text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-gray-600">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-2">
              {user[0].toUpperCase()}
            </div>
            <div className="text-sm font-medium text-white">{user}</div>
          </div>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div 
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto bg-gray-900"
        >
          {currentChat().messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-lg px-4 py-2 ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <input
              className="flex-1 border border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button
              className={`bg-gray-700 text-white px-4 py-2 border-y border-gray-600 ${isListening ? "animate-pulse bg-red-500" : ""}`}
              onClick={toggleListening}
              title="Voice Input"
              type="button"
            >
              {isListening ? "🔴" : "🎤"}
            </button>
            <label className="bg-gray-700 text-white px-4 py-2 border-y border-gray-600 cursor-pointer hover:bg-gray-600">
              📎
              <input
                type="file"
                accept=".ppt,.pptx,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
              onClick={handleSend}
              type="button"
            >
              Send
            </button>
          </div>
          {isListening && (
            <div className="text-green-400 text-xs mt-2">
              Listening... {transcript}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}