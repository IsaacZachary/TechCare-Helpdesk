
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { Ticket } from '../types';
import { mockTickets } from '../data/mockData';

// Components
import LoginPage from '../components/LoginPage';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import AdminDashboard from '../components/AdminDashboard';
import SuperAdminDashboard from '../components/SuperAdminDashboard';
import UserDashboard from '../components/UserDashboard';
import TicketList from '../components/TicketList';
import TicketForm from '../components/TicketForm';
import TicketDetail from '../components/TicketDetail';
import ChatWidget from '../components/ChatWidget';
import ChatbotWidget from '../components/ChatbotWidget';
import PaymentPlans from '../components/PaymentPlans';
import PaymentHistory from '../components/PaymentHistory';
import UsersManagement from '../components/EnhancedUserManagement';
import MessagesModule from '../components/MessagesModule';
import SettingsModule from '../components/SettingsModule';
import IndustrySelector from '../components/IndustrySelector';

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();
  const { theme } = useTheme();
  const [activeView, setActiveView] = useState('dashboard');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showIndustrySelector, setShowIndustrySelector] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('TechCare Africa');

  // Check if we should show the industry selector (first login)
  useEffect(() => {
    if (isAuthenticated) {
      const hasSelectedIndustry = localStorage.getItem('selectedIndustry');
      if (!hasSelectedIndustry) {
        setShowIndustrySelector(true);
      } else {
        setSelectedIndustry(hasSelectedIndustry);
        updateCompanyNameBasedOnIndustry(hasSelectedIndustry);
      }
    }
  }, [isAuthenticated]);

  const handleCreateTicket = (newTicketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...newTicketData,
      id: String(tickets.length + 1),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTickets(prev => [newTicket, ...prev]);
    setShowTicketForm(false);
  };

  const handleUpdateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, ...updates }
          : ticket
      )
    );
    // Update selected ticket if it's currently being viewed
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setActiveView('ticket-detail');
  };

  const handleBackToTickets = () => {
    setSelectedTicket(null);
    setActiveView('tickets');
  };

  const handleIndustrySelect = (industry: string) => {
    localStorage.setItem('selectedIndustry', industry);
    setSelectedIndustry(industry);
    setShowIndustrySelector(false);
    updateCompanyNameBasedOnIndustry(industry);
  };

  const updateCompanyNameBasedOnIndustry = (industry: string) => {
    switch(industry) {
      case 'isp':
        setCompanyName('ConnectNet ISP');
        break;
      case 'hospital':
        setCompanyName('HealthCare Plus');
        break;
      case 'university':
        setCompanyName('Global University');
        break;
      case 'ngo':
        setCompanyName('HelpingHands NGO');
        break;
      case 'retail':
        setCompanyName('ShopSmart Retail');
        break;
      default:
        setCompanyName('TechCare Africa');
    }
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show industry selector on first login
  if (showIndustrySelector) {
    return <IndustrySelector onSelect={handleIndustrySelect} />;
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex ${theme}`}>
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
        companyName={companyName}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {activeView === 'dashboard' && (
            user?.role === 'superadmin' ? (
              <SuperAdminDashboard />
            ) : user?.role === 'admin' ? (
              <AdminDashboard 
                tickets={tickets} 
                onViewTicket={handleViewTicket}
              />
            ) : (
              <UserDashboard
                tickets={tickets}
                onViewTicket={handleViewTicket}
              />
            )
          )}
          
          {activeView === 'tickets' && (
            <TicketList 
              tickets={tickets}
              onCreateTicket={() => setShowTicketForm(true)}
              onViewTicket={handleViewTicket}
            />
          )}
          
          {activeView === 'ticket-detail' && selectedTicket && (
            <TicketDetail 
              ticket={selectedTicket}
              onBack={handleBackToTickets}
              onUpdateTicket={handleUpdateTicket}
            />
          )}
          
          {activeView === 'users' && user?.role === 'superadmin' && (
            <UsersManagement />
          )}

          {activeView === 'settings' && (
            <SettingsModule />
          )}

          {activeView === 'chat' && (
            <MessagesModule />
          )}

          {activeView === 'payments' && (
            <div className="space-y-12">
              <PaymentPlans />
              <PaymentHistory />
            </div>
          )}
        </div>
      </main>
      
      {showTicketForm && (
        <TicketForm 
          onClose={() => setShowTicketForm(false)}
          onSubmit={handleCreateTicket}
        />
      )}

      {/* Chat Widgets */}
      <ChatWidget />
      <ChatbotWidget />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Index;
