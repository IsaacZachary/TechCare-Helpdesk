import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, X, Bot, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '../contexts/ThemeContext';

// Mock bot messages for initial conversation
const mockBotMessages: ChatMessage[] = [
  {
    id: '1',
    content: "Hello! I'm your TechCare assistant. How can I help you today?",
    sender: 'TechCare Bot',
    timestamp: new Date(),
    isBot: true
  }
];

const ChatbotWidget: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(mockBotMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isThinking, setIsThinking] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Create a new user message
    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'You',
      timestamp: new Date()
    };

    // Add message to state
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsThinking(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(newMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsThinking(false);
    }, 1500);
  };

  // Simple mock function for bot responses
  const generateBotResponse = (userMessage: string): ChatMessage => {
    let responseContent = "I'm sorry, I don't understand. Could you rephrase that?";
    
    if (userMessage.toLowerCase().includes('help')) {
      responseContent = "I'd be happy to help! What do you need assistance with?";
    } else if (userMessage.toLowerCase().includes('ticket')) {
      responseContent = "You can create a new ticket by clicking on the 'Create Ticket' button on the tickets page.";
    } else if (userMessage.toLowerCase().includes('payment')) {
      responseContent = "You can view payment options in the 'Payments' section accessible from the sidebar.";
    } else if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      responseContent = "Hello there! How can I assist you today?";
    }
    
    return {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      sender: 'TechCare Bot',
      timestamp: new Date(),
      isBot: true
    };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 h-14 w-14 rounded-full shadow-lg z-50 bg-green-600 hover:bg-green-700 text-white"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-24 w-80 sm:w-96 shadow-lg z-50 ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white'}`}>
      <CardHeader className="p-4 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span>TechCare Assistant</span>
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col h-96">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 max-w-[80%] ${
                  msg.isBot ? 'mr-auto' : 'ml-auto'
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    msg.isBot
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-bl-none'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-br-none'
                  }`}
                >
                  {msg.content}
                </div>
                <div
                  className={`text-xs mt-1 flex items-center gap-1 ${
                    msg.isBot ? 'text-left' : 'text-right justify-end'
                  }`}
                >
                  <span className="text-slate-500 dark:text-slate-400">
                    {msg.sender} • {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="mb-4 max-w-[80%] mr-auto">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-bl-none flex items-center gap-2">
                  <span className="animate-pulse">•</span>
                  <span className="animate-pulse delay-100">•</span>
                  <span className="animate-pulse delay-200">•</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSendMessage}
            className="border-t p-4 flex items-center gap-2"
          >
            <Input
              type="text"
              placeholder="Ask me anything..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="h-10 w-10 bg-green-600 hover:bg-green-700">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotWidget;
