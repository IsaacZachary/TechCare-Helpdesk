import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';
import { mockEnhancedUsers } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  UserPlus, 
  X, 
  RefreshCw, 
  Download,
  Users as UsersIcon,
  UserCheck,
  UserX,
  Mail,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EnhancedUser extends User {
  isActive: boolean;
  lastLogin?: Date;
  joinedAt: Date;
  department: string;
  accountType: string;
}

const EnhancedUserManagement: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<EnhancedUser[]>(
    mockEnhancedUsers.map(user => ({
      ...user,
      role: user.role as 'superadmin' | 'admin' | 'user'
    }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const { toast } = useToast();

  // Statistics
  const activeUsers = users.filter(user => user.isActive).length;
  const inactiveUsers = users.filter(user => !user.isActive).length;
  const admins = users.filter(user => user.role === 'admin' || user.role === 'superadmin').length;
  const regularUsers = users.filter(user => user.role === 'user').length;

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    // Text search
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Role filter
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    // Status filter
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'active' && user.isActive) || 
      (filterStatus === 'inactive' && !user.isActive);
    
    // Department filter
    const matchesDepartment = 
      filterDepartment === 'all' || 
      user.department === filterDepartment;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  // Department options
  const departments = Array.from(new Set(users.map(user => user.department)));

  // Update user role
  const handleRoleChange = (userId: string, newRole: 'superadmin' | 'admin' | 'user') => {
    if (userId === currentUser?.id && newRole !== 'superadmin') {
      toast({
        title: "Cannot change your own role",
        description: "You cannot downgrade your own superadmin privileges.",
        variant: "destructive",
      });
      return;
    }

    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      )
    );
    
    toast({
      title: "User role updated",
      description: `User role has been updated to ${newRole}.`,
    });
  };

  // Toggle user active status
  const toggleUserStatus = (userId: string) => {
    if (userId === currentUser?.id) {
      toast({
        title: "Cannot deactivate yourself",
        description: "You cannot deactivate your own account.",
        variant: "destructive",
      });
      return;
    }

    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === userId ? { ...u, isActive: !u.isActive } : u
      )
    );
    
    const user = users.find(u => u.id === userId);
    const newStatus = user?.isActive ? 'deactivated' : 'activated';
    
    toast({
      title: `User ${newStatus}`,
      description: `User account has been ${newStatus} successfully.`,
    });
  };

  // Get badge color based on role
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-900/50';
      case 'admin':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900/50';
      case 'user':
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
      default:
        return '';
    }
  };

  // Get badge color based on active status
  const getStatusBadgeColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-900/50'
      : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900/50';
  };

  // Format date
  const formatDate = (date?: Date) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Send invitation to new user (mock)
  const sendInvitation = () => {
    toast({
      title: "Invitation sent",
      description: "A new user invitation has been sent successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">User Management</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage users and their roles in the system
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-slate-500 mt-1">
              {users.length} total registered users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-slate-500 mt-1">
              {Math.round((activeUsers / users.length) * 100)}% of total users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inactive Users
            </CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveUsers}</div>
            <p className="text-xs text-slate-500 mt-1">
              {Math.round((inactiveUsers / users.length) * 100)}% of total users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Admin Users
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {admins}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regularUsers}</div>
            <p className="text-xs text-slate-500 mt-1">
              Regular Users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <Button onClick={sendInvitation}>
              <Mail className="w-4 h-4 mr-2" />
              Invite User
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200"
                  />
                  {searchTerm && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setSearchTerm('')}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterRole('all')} 
                      className={filterRole === 'all' ? 'bg-slate-100 dark:bg-slate-800' : ''}>
                      All Roles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRole('superadmin')}
                      className={filterRole === 'superadmin' ? 'bg-slate-100 dark:bg-slate-800' : ''}>
                      Superadmin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRole('admin')}
                      className={filterRole === 'admin' ? 'bg-slate-100 dark:bg-slate-800' : ''}>
                      Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRole('user')}
                      className={filterRole === 'user' ? 'bg-slate-100 dark:bg-slate-800' : ''}>
                      User
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterDepartment('all')}
                      className={filterDepartment === 'all' ? 'bg-slate-100 dark:bg-slate-800' : ''}>
                      All Departments
                    </DropdownMenuItem>
                    {departments.map(dept => (
                      <DropdownMenuItem key={dept} onClick={() => setFilterDepartment(dept)}
                        className={filterDepartment === dept ? 'bg-slate-100 dark:bg-slate-800' : ''}>
                        {dept}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="icon" onClick={() => {
                  setSearchTerm('');
                  setFilterRole('all');
                  setFilterStatus('all');
                  setFilterDepartment('all');
                }}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
                
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <TabsContent value="all">
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-slate-500">
                      No users found matching your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(user.isActive)}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Switch 
                            checked={user.isActive} 
                            onCheckedChange={() => toggleUserStatus(user.id)}
                            disabled={user.id === currentUser?.id}
                          />
                          <Select 
                            value={user.role} 
                            onValueChange={(value) => 
                              handleRoleChange(
                                user.id, 
                                value as 'superadmin' | 'admin' | 'user'
                              )
                            }
                            disabled={user.id === currentUser?.id}
                          >
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="superadmin">Superadmin</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers
                  .filter(user => user.isActive)
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Switch 
                            checked={user.isActive} 
                            onCheckedChange={() => toggleUserStatus(user.id)}
                            disabled={user.id === currentUser?.id}
                          />
                          <Select 
                            value={user.role} 
                            onValueChange={(value) => 
                              handleRoleChange(
                                user.id, 
                                value as 'superadmin' | 'admin' | 'user'
                              )
                            }
                            disabled={user.id === currentUser?.id}
                          >
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="superadmin">Superadmin</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="inactive">
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers
                  .filter(user => !user.isActive)
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Switch 
                            checked={user.isActive} 
                            onCheckedChange={() => toggleUserStatus(user.id)}
                          />
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4 mr-2" />
                            Reinvite
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="admins">
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers
                  .filter(user => user.role === 'admin' || user.role === 'superadmin')
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(user.isActive)}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Switch 
                            checked={user.isActive} 
                            onCheckedChange={() => toggleUserStatus(user.id)}
                            disabled={user.id === currentUser?.id}
                          />
                          <Select 
                            value={user.role} 
                            onValueChange={(value) => 
                              handleRoleChange(
                                user.id, 
                                value as 'superadmin' | 'admin' | 'user'
                              )
                            }
                            disabled={user.id === currentUser?.id}
                          >
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="superadmin">Superadmin</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedUserManagement;
