
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Ticket } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, AlertTriangle, Clock8, BarChart3, BadgeDollarSign, FileText } from 'lucide-react';

interface UserDashboardProps {
  tickets: Ticket[];
  onViewTicket: (ticket: Ticket) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ tickets, onViewTicket }) => {
  const { user } = useAuth();
  
  // Filter tickets for the current user
  const userTickets = tickets.filter(ticket => ticket.createdBy === user?.email);
  
  // Calculate statistics
  const openTickets = userTickets.filter(ticket => ticket.status === 'Open');
  const resolvedTickets = userTickets.filter(ticket => ticket.status === 'Resolved');
  const inProgressTickets = userTickets.filter(ticket => ticket.status === 'In Progress');
  
  const resolutionRate = userTickets.length > 0
    ? Math.round((resolvedTickets.length / userTickets.length) * 100)
    : 0;
  
  // Recent tickets (up to 5)
  const recentTickets = [...userTickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Closed':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Welcome, {user?.name}</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Here's an overview of your support tickets and activity
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <FileText className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userTickets.length}</div>
            <p className="text-xs text-slate-500 mt-1">All tickets you've submitted</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets.length}</div>
            <p className="text-xs text-slate-500 mt-1">Awaiting initial response</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock8 className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets.length}</div>
            <p className="text-xs text-slate-500 mt-1">Being worked on</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets.length}</div>
            <p className="text-xs text-slate-500 mt-1">Successfully resolved</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Resolution Rate */}
      <Card>
        <CardHeader>
          <CardTitle>Resolution Rate</CardTitle>
          <CardDescription>Percentage of your tickets that have been resolved</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{resolutionRate}%</span>
          </div>
          <Progress value={resolutionRate} className="h-2" />
        </CardContent>
        <CardFooter className="text-sm text-slate-500">
          {resolvedTickets.length} out of {userTickets.length} tickets resolved
        </CardFooter>
      </Card>
      
      {/* Recent Tickets */}
      <div>
        <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">Recent Tickets</h2>
        {recentTickets.length === 0 ? (
          <Card className="text-center p-6">
            <CardContent>
              <p className="text-slate-500 dark:text-slate-400">You haven't submitted any tickets yet.</p>
              <Button className="mt-4">Create Your First Ticket</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {recentTickets.map(ticket => (
              <Card key={ticket.id} className="overflow-hidden cursor-pointer hover:border-blue-200 dark:hover:border-blue-800 transition-colors" onClick={() => onViewTicket(ticket)}>
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-slate-800 dark:text-slate-100">{ticket.title}</h3>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                    {ticket.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Ticket #{ticket.id}</span>
                    <span>
                      {new Date(ticket.createdAt).toLocaleDateString()} • {new Date(ticket.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgeDollarSign className="h-5 w-5 text-green-500" />
            Your Subscription
          </CardTitle>
          <CardDescription>Current subscription plan and payment status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Premium Support</p>
              <p className="text-sm text-slate-500">Monthly subscription</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
              Active
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Next payment</p>
              <p className="font-medium">August 15, 2025</p>
            </div>
            <div>
              <p className="text-slate-500">Amount</p>
              <p className="font-medium">$49.99</p>
            </div>
            <div>
              <p className="text-slate-500">Payment method</p>
              <p className="font-medium">M-Pesa</p>
            </div>
            <div>
              <p className="text-slate-500">Status</p>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/30">
                Paid
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View History</Button>
          <Button>Manage Subscription</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDashboard;
