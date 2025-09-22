import React, { useState } from 'react';
import './App.css';
import SearchSection from './components/SearchSection';
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';
import TaskModal from './components/TaskModal';
import axios from 'axios';

class AppState {
  constructor() {
    this.currentPage = 'home';
    this.chatMessages = [];
    this.tasks = [];
    this.searchResults = [];
  }
}

function App() {
  const [appState] = useState(() => new AppState());
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [chatMessages, setChatMessages] = useState(appState.chatMessages);
  const [tasks, setTasks] = useState(appState.tasks);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // ===================== SEARCH HANDLER =====================
  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setCurrentPage('search');

    try {
      const { data } = await axios.post('https://tj2noyhdmenib-backend--5000.prod1b.defang.dev/search', { query });
      setSearchResults(data.results || []);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    }
  };

  const showHomePage = () => setCurrentPage('home');

  // ===================== CHAT HANDLERS =====================
  const sendMessage = (message) => {
    if (!message.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', message, timestamp: new Date().toISOString() };
    setChatMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const aiMessage = { id: Date.now() + 1, type: 'ai', message: generateAIResponse(message), timestamp: new Date().toISOString() };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      'explain': "I'd be happy to explain any concept for you! What specific topic would you like me to break down?",
      'practice': "Great! I can generate practice problems for you. Which subject and topic would you like to practice?",
      'revision': "Let's start a revision session! What subject or topic would you like to review?",
      'homework': "I'm here to help with your homework! Share the question or topic, and I'll guide you.",
      'tips': "Here are some effective study tips: 1) Use active recall, 2) Space out sessions, 3) Create mind maps, 4) Take breaks, 5) Teach the concept to someone else."
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const key in responses) if (lowerMessage.includes(key)) return responses[key];

    const defaults = [
      "That's an interesting question! Could you provide more details?",
      "I'm here to help! What specific aspect do you want me to focus on?",
      "Great question! What's your current level on this topic?",
      "I'd love to help! Can you tell me more about what you're trying to learn?"
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  // ===================== TASK HANDLERS =====================
  const addTask = (taskData) => {
    const newTask = { id: Date.now(), ...taskData, completed: false };
    setTasks(prev => [...prev, newTask]);
    setIsTaskModalOpen(false);
  };
  const toggleTaskComplete = (taskId) => setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  const deleteTask = (taskId) => setTasks(prev => prev.filter(t => t.id !== taskId));
  const navigateMonth = (direction) => setCurrentMonth(prev => { const m = new Date(prev); m.setMonth(m.getMonth() + direction); return m; });

  return (
    <div className="App">
      <SearchSection onSearch={handleSearch} />
      <main className="main-content">
        <div className="container">
          {currentPage === 'home' && (
            <HomePage
              chatMessages={chatMessages}
              onSendMessage={sendMessage}
              tasks={tasks}
              onToggleTask={toggleTaskComplete}
              onDeleteTask={deleteTask}
              onAddTask={() => setIsTaskModalOpen(true)}
              currentMonth={currentMonth}
              onNavigateMonth={navigateMonth}
            />
          )}
          {currentPage === 'search' && (
            <SearchResults
              query={searchQuery}
              results={searchResults}
              onBackToHome={showHomePage}
            />
          )}
        </div>
      </main>
      {isTaskModalOpen && <TaskModal onClose={() => setIsTaskModalOpen(false)} onSave={addTask} />}
    </div>
  );
}

export default App;
