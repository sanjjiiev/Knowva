import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';
import TaskModal from './components/TaskModal';

class AppState {
  constructor() {
    this.currentPage = 'home';
    this.chatMessages = [];
    this.tasks = [];
    this.searchResults = [];
    this.currentMonth = new Date();
    this.searchQuery = '';
    this.filters = { subject: '', type: '', level: '' };
    this.loadMockData();
  }

  loadMockData() {
    this.chatMessages = [
      {
        id: 1,
        type: "ai",
        message: "Hello! I'm your AI learning assistant. I can help you with explanations, generate practice problems, and guide your revision sessions. What would you like to learn about today?",
        timestamp: new Date().toISOString()
      }
    ];

    this.tasks = [
      {
        id: 1,
        title: "Review Calculus Chapter 3",
        description: "Complete practice problems 1-15",
        dueDate: "2025-09-23",
        priority: "high",
        completed: false
      },
      {
        id: 2,
        title: "Prepare for History Quiz",
        description: "Study World War I timeline",
        dueDate: "2025-09-24",
        priority: "medium",
        completed: false
      },
      {
        id: 3,
        title: "Python Assignment",
        description: "Complete sorting algorithms project",
        dueDate: "2025-09-25",
        priority: "high",
        completed: true
      }
    ];

    this.searchResults = [
      {
        id: 1,
        title: "Khan Academy - Algebra Basics",
        snippet: "Learn the fundamentals of algebra including variables, linear equations, and basic operations. Free interactive lessons with practice problems.",
        url: "https://khanacademy.org/algebra-basics",
        subject: "Mathematics",
        type: "Interactive Lessons",
        level: "Beginner"
      },
      {
        id: 2,
        title: "Coursera - Introduction to Machine Learning",
        snippet: "Comprehensive course covering supervised and unsupervised learning, neural networks, and practical applications of machine learning algorithms.",
        url: "https://coursera.org/ml-course",
        subject: "Computer Science",
        type: "Video Course",
        level: "Intermediate"
      },
      {
        id: 3,
        title: "MIT OpenCourseWare - Physics I",
        snippet: "Classical mechanics course materials including lecture notes, problem sets, and video demonstrations from MIT professors.",
        url: "https://ocw.mit.edu/physics",
        subject: "Physics",
        type: "Course Materials",
        level: "Advanced"
      },
      {
        id: 4,
        title: "Duolingo - Spanish Language Learning",
        snippet: "Interactive language learning app with gamified lessons, speaking practice, and adaptive learning algorithms.",
        url: "https://duolingo.com/spanish",
        subject: "Languages",
        type: "Mobile App",
        level: "All Levels"
      },
      {
        id: 5,
        title: "TED-Ed - Critical Thinking Animations",
        snippet: "Animated educational videos explaining complex concepts in philosophy, logic, and critical thinking skills.",
        url: "https://ted.com/education/critical-thinking",
        subject: "Philosophy",
        type: "Video",
        level: "Intermediate"
      }
    ];

    this.subjects = ["Mathematics", "Physics", "Computer Science", "Languages", "History", "Biology", "Chemistry", "Philosophy"];
    this.resourceTypes = ["Video Course", "Interactive Lessons", "Course Materials", "Mobile App", "Video", "Practice Problems", "Study Guides"];
    this.levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
  }
}

function App() {
  const [appState] = useState(() => new AppState());
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState(appState.chatMessages);
  const [tasks, setTasks] = useState(appState.tasks);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [filters, setFilters] = useState({ subject: '', type: '', level: '' });

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchQuery(query);
      setCurrentPage('search');
    }
  };

  const showHomePage = () => {
    setCurrentPage('home');
  };

  const sendMessage = (message, context = 'home') => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        message: message,
        timestamp: new Date().toISOString()
      };

      const newMessages = [...chatMessages, userMessage];
      setChatMessages(newMessages);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          message: aiResponse,
          timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, aiMessage]);
      }, 1500);
    }
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      'explain': "I'd be happy to explain any concept for you! What specific topic would you like me to break down? I can help with subjects like mathematics, science, history, languages, and more.",
      'practice': "Great! I can generate practice problems for you. Which subject and topic would you like to practice? For example, algebra equations, physics problems, vocabulary exercises, etc.",
      'revision': "Let's start a revision session! What subject or topic would you like to review? I can help you create a structured study plan and quiz you on key concepts.",
      'homework': "I'm here to help with your homework! Please share the specific question or topic you're working on, and I'll guide you through it step by step.",
      'tips': "Here are some effective study tips: 1) Use active recall by testing yourself, 2) Space out your study sessions, 3) Create mind maps for visual learning, 4) Take regular breaks, 5) Teach the concept to someone else. What subject are you studying?"
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    const defaultResponses = [
      "That's an interesting question! Could you provide more details so I can give you the most helpful explanation?",
      "I'm here to help you learn! What specific aspect of this topic would you like me to focus on?",
      "Great question! Let me help you understand this better. What's your current level of knowledge on this topic?",
      "I'd love to help you with that! Can you tell me more about what you're trying to learn or solve?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setIsTaskModalOpen(false);
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  return (
    <div className="App">
      <Header />
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
              results={appState.searchResults}
              filters={filters}
              onFiltersChange={setFilters}
              onBackToHome={showHomePage}
            />
          )}
        </div>
      </main>

      {isTaskModalOpen && (
        <TaskModal
          onClose={() => setIsTaskModalOpen(false)}
          onSave={addTask}
        />
      )}
    </div>
  );
}

export default App;
