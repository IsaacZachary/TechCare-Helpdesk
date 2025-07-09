import React from 'react';
import { mockUsers, mockTickets, mockSystemLogs, mockPaymentHistory } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Users, Ticket, FileText, AlertTriangle, Activity, DollarSign } from 'lucide-react';
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

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Calculate stats
  const stats = {
    totalUsers: mockUsers.length,
    totalTickets: mockTickets.length,
    openTickets: mockTickets.filter(t => t.status === 'Open').length,
    totalPayments: mockPaymentHistory.reduce((sum, record) => sum + record.amount, 0).toFixed(2),
    admins: mockUsers.filter(u => u.role === 'admin').length,
    superadmins: mockUsers.filter(u => u.role === 'superadmin').length,
    regularUsers: mockUsers.filter(u => u.role === 'user').length,
  };

  // Recent system logs
  const recentLogs = [...mockSystemLogs]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  // Get badge color based on log level
  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>;
      default:
        return <Badge>{level}</Badge>;
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          System Overview
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Complete system status and metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-900/10 dark:border-purple-900/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Users</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 dark:bg-purple-800/50 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="text-xs bg-purple-100 dark:bg-purple-800/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                {stats.regularUsers} Users
              </span>
              <span className="text-xs bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                {stats.admins} Admins
              </span>
              <span className="text-xs bg-indigo-100 dark:bg-indigo-800/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full">
                {stats.superadmins} Superadmins
              </span>
            </div>
          </CardContent>
        </Card>

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
            <div className="mt-4">
              <div className="flex items-center">
                <div className="w-full bg-blue-200 dark:bg-blue-800/50 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full" 
                    style={{width: `${(stats.openTickets / stats.totalTickets) * 100}%`}}
                  ></div>
                </div>
                <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">
                  {stats.openTickets} open
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-900/10 dark:border-green-900/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Revenue</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">${stats.totalPayments}</p>
              </div>
              <div className="w-12 h-12 bg-green-200 dark:bg-green-800/50 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-green-600 dark:text-green-400">
                Total from {mockPaymentHistory.length} transactions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent System Logs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Logs
            </CardTitle>
            <CardDescription>
              Recent system events and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(log.timestamp)}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                    <TableCell>{getLogLevelBadge(log.level)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Status
            </CardTitle>
            <CardDescription>
              Current system health metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Server Load</span>
                  <span className="text-sm font-semibold text-green-600">Normal</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Database</span>
                  <span className="text-sm font-semibold text-green-600">Healthy</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm font-semibold text-yellow-600">Moderate</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">API Calls</span>
                  <span className="text-sm font-semibold text-blue-600">1,247 today</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">All services operational</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
