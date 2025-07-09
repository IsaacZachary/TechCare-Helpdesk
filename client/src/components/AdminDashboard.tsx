
import React from 'react';
import { mockUsers, mockTickets, mockSystemLogs, mockPayments } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Users, Ticket, FileText, AlertTriangle, Activity, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Calculate stats
  const stats = {
    totalUsers: mockUsers.length,
    totalTickets: mockTickets.length,
    openTickets: mockTickets.filter(t => t.status === 'Open').length,
    resolvedTickets: mockTickets.filter(t => t.status === 'Resolved').length,
    totalPayments: mockPayments.reduce((sum, record) => sum + record.amount, 0).toFixed(2),
    pendingTickets: mockTickets.filter(t => t.status === 'In Progress').length,
  };

  // Recent tickets assigned to current admin
  const recentTickets = [...mockTickets]
    .filter(ticket => ticket.assignedTo === user?.email)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  // Mock chart data
  const ticketTrendData = [
    { name: 'Mon', tickets: 12 },
    { name: 'Tue', tickets: 19 },
    { name: 'Wed', tickets: 8 },
    { name: 'Thu', tickets: 15 },
    { name: 'Fri', tickets: 22 },
    { name: 'Sat', tickets: 7 },
    { name: 'Sun', tickets: 5 },
  ];

  const ticketStatusData = [
    { name: 'Open', value: stats.openTickets, color: '#ef4444' },
    { name: 'In Progress', value: stats.pendingTickets, color: '#f59e0b' },
    { name: 'Resolved', value: stats.resolvedTickets, color: '#10b981' },
  ];

  // Get badge color based on priority
  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900/50';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-900/50';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-900/50';
      default:
        return '';
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900/50';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-900/50';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-900/50';
      case 'Closed':
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
      default:
        return '';
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage tickets and monitor support performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-900/10 dark:border-blue-900/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Tickets</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalTickets}</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800/50 rounded-full flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 dark:from-red-900/20 dark:to-red-900/10 dark:border-red-900/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Open Tickets</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.openTickets}</p>
              </div>
              <div className="w-12 h-12 bg-red-200 dark:bg-red-800/50 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-900/10 dark:border-green-900/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Resolved</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.resolvedTickets}</p>
              </div>
              <div className="w-12 h-12 bg-green-200 dark:bg-green-800/50 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-900/10 dark:border-purple-900/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Revenue</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">${stats.totalPayments}</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 dark:bg-purple-800/50 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Weekly Ticket Trend
            </CardTitle>
            <CardDescription>
              Number of tickets created this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ticketTrendData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="tickets" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ticket Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Ticket Status Distribution
            </CardTitle>
            <CardDescription>
              Current ticket status breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {ticketStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assigned Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Your Recent Tickets
          </CardTitle>
          <CardDescription>
            Tickets assigned to you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTickets.length > 0 ? (
                recentTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.title}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadgeColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                    <TableCell>{formatDate(ticket.updatedAt)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-slate-500">
                    No tickets assigned to you yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
