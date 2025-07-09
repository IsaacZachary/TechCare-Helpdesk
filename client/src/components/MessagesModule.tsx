
import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Clock,
  Star,
  StarOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockChatMessages, mockMessageThreads } from '../data/mockData';
import { ChatMessage, MessageThread } from '../types';

const MessagesModule: React.FC = () => {
  const { user } = useAuth();
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredThreads, setFilteredThreads] = useState(mockMessageThreads);
  const [activeMessages, setActiveMessages] = useState<ChatMessage[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    
    if (query.trim() === '') {
      setFilteredThreads(mockMessageThreads);
    } else {
      setFilteredThreads(mockMessageThreads.filter(
        thread => thread.subject.toLowerCase().includes(query.toLowerCase()) || 
                 thread.sender.toLowerCase().includes(query.toLowerCase())
      ));
    }
  };
  
  const handleSelectThread = (thread: MessageThread) => {
    setSelectedThread(thread);
    
    // Get messages for this thread
    const threadMessages = mockChatMessages.filter(msg => msg.threadId === thread.id);
    setActiveMessages(threadMessages);
  };
  
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedThread) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      threadId: selectedThread.id,
      content: messageInput,
      sender: user?.name || 'You',
      timestamp: new Date(),
      isOutbound: true
    };
    
    setActiveMessages([...activeMessages, newMessage]);
    setMessageInput('');
  };
  
  const toggleFavorite = (threadId: string) => {
    if (favorites.includes(threadId)) {
      setFavorites(favorites.filter(id => id !== threadId));
    } else {
      setFavorites([...favorites, threadId]);
    }
  };
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) {
      return `${days}d ago`;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) {
      return `${hours}h ago`;
    }
    
    return `${Math.floor(diff / (1000 * 60))}m ago`;
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">Messages</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage and respond to all your messages
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-230px)]">
        {/* Message List */}
        <Card className="col-span-1 border overflow-hidden flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search messages..."
                value={searchInput}
                onChange={handleSearchChange}
                className="pl-10 border-slate-200"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredThreads.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500 dark:text-slate-400">No messages found</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredThreads.map(thread => (
                  <div 
                    key={thread.id} 
                    onClick={() => handleSelectThread(thread)}
                    className={`p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${selectedThread?.id === thread.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                  >
                    <div className="flex justify-between mb-1">
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {thread.sender}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimestamp(thread.timestamp)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="text-sm text-slate-600 dark:text-slate-300 truncate max-w-[180px]">
                        {thread.subject}
                      </div>
                      <div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(thread.id);
                          }}
                        >
                          {favorites.includes(thread.id) ? 
                            <Star className="h-4 w-4 text-amber-400" /> : 
                            <StarOff className="h-4 w-4 text-slate-400" />
                          }
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
                      {thread.lastMessage}
                    </div>
                    
                    {thread.unread > 0 && (
                      <Badge className="mt-2 bg-blue-500">{thread.unread} new</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
        
        {/* Conversation Pane */}
        <Card className="col-span-2 border flex flex-col">
          {selectedThread ? (
            <>
              <div className="border-b p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="md:hidden mr-2"
                    onClick={() => setSelectedThread(null)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <div className="bg-blue-100 dark:bg-blue-800 h-full w-full rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium">
                      {selectedThread.sender[0].toUpperCase()}
                    </div>
                  </Avatar>
                  <div className="ml-3">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {selectedThread.sender}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedThread.subject}
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isOutbound ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] p-3 rounded-lg ${
                        message.isOutbound 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className={`text-xs mt-1 ${message.isOutbound ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t p-3">
                <div className="flex">
                  <Input 
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="border-slate-200"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <div className="flex ml-2">
                    <Button variant="ghost" size="icon" className="text-slate-500">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button onClick={handleSendMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-full p-6 inline-flex mb-4">
                  <MessageIcon className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-1">
                  Select a conversation
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Choose a message thread to view the conversation
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// Custom message icon
const MessageIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default MessagesModule;
