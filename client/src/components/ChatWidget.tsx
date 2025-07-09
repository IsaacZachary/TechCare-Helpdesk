
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChatMessage } from '../types';
import { Send, X, MessageSquare, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '../contexts/ThemeContext';
import { mockChatMessages } from '../data/mockData';

const ChatWidget: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate socket.io connection
  useEffect(() => {
    console.log('Chat widget mounted - would connect to Socket.IO here');
    
    return () => {
      console.log('Chat widget unmounted - would disconnect from Socket.IO here');
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    // Create a new message
    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: user.name,
      timestamp: new Date()
    };

    // Add message to state
    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate receiving a response after 1 second
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Thanks for your message. An agent will respond shortly.',
        sender: 'Admin User',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-80 sm:w-96 shadow-lg z-50 ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white'}`}>
      <CardHeader className="p-4 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            <span>Live Chat Support</span>
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
                  msg.sender === user?.name
                    ? 'ml-auto'
                    : 'mr-auto'
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    msg.sender === user?.name
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
                <div
                  className={`text-xs mt-1 flex items-center gap-1 ${
                    msg.sender === user?.name
                      ? 'text-right justify-end'
                      : 'text-left'
                  }`}
                >
                  <span className="text-slate-500 dark:text-slate-400">
                    {msg.sender} • {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSendMessage}
            className="border-t p-4 flex items-center gap-2"
          >
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="h-10 w-10">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWidget;
