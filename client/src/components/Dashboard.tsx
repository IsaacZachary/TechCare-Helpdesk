
import React from 'react';
import { Ticket } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { TicketIcon, Users, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  tickets: Ticket[];
  onViewTicket: (ticket: Ticket) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tickets, onViewTicket }) => {
  const { user } = useAuth();

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    highPriority: tickets.filter(t => t.priority === 'High').length,
  };

  const recentTickets = tickets
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Closed':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-slate-600">
          Here's what's happening with your helpdesk today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Tickets</p>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <TicketIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Open Tickets</p>
                <p className="text-2xl font-bold text-red-700">{stats.open}</p>
              </div>
              <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-700">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Resolved</p>
                <p className="text-2xl font-bold text-green-700">{stats.resolved}</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Tickets
            </CardTitle>
            <CardDescription>
              Latest ticket submissions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.length === 0 ? (
                <div className="text-center py-8">
                  <TicketIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No tickets yet</p>
                </div>
              ) : (
                recentTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors duration-200"
                    onClick={() => onViewTicket(ticket)}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800 mb-1">
                        {ticket.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">
                        {ticket.description.length > 100 
                          ? `${ticket.description.substring(0, 100)}...`
                          : ticket.description
                        }
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(ticket.status)} border text-xs`}>
                          {ticket.status}
                        </Badge>
                        <Badge className={`${getPriorityColor(ticket.priority)} border text-xs`}>
                          {ticket.priority}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {ticket.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Stats
            </CardTitle>
            <CardDescription>
              Key metrics at a glance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">High Priority</span>
                <span className="text-sm font-bold text-red-600">{stats.highPriority}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Resolution Rate</span>
                <span className="text-sm font-bold text-green-600">
                  {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Active Tickets</span>
                <span className="text-sm font-bold text-blue-600">
                  {stats.open + stats.inProgress}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Your Role</span>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 capitalize text-xs">
                  {user?.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
