
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, UserCog, BellRing, Settings as SettingsIcon, AlertCircle, HelpCircle, Key } from 'lucide-react';

const SettingsModule: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+254712345678', // Mock data
    company: 'TechCare Africa',
    jobTitle: 'Support Specialist',
    timezone: 'Africa/Nairobi',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    emailDigest: 'daily',
    newTicketAlert: true,
    ticketUpdatesAlert: true,
    systemUpdatesAlert: false
  });

  const [systemSettings, setSystemSettings] = useState({
    companyName: 'TechCare Africa',
    defaultIndustry: 'ISP',
    logo: '/logo.png',
    primaryColor: '#3b82f6',
    sessionTimeout: 30,
    ticketAutoClose: 7,
    maintenanceMode: false
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification preferences saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  const handleSystemUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "System settings updated",
      description: "System settings have been updated successfully.",
    });
  };

  const toggleNotificationSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {user?.role === 'superadmin' && (
            <TabsTrigger value="system">System</TabsTrigger>
          )}
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5 text-blue-500" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Manage your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={profileData.name}
                      onChange={e => setProfileData({...profileData, name: e.target.value})}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={profileData.email}
                      onChange={e => setProfileData({...profileData, email: e.target.value})}
                      placeholder="Your email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      value={profileData.phone}
                      onChange={e => setProfileData({...profileData, phone: e.target.value})}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input 
                      id="role"
                      value={user?.role}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company"
                      value={profileData.company}
                      onChange={e => setProfileData({...profileData, company: e.target.value})}
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input 
                      id="jobTitle"
                      value={profileData.jobTitle}
                      onChange={e => setProfileData({...profileData, jobTitle: e.target.value})}
                      placeholder="Your job title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={profileData.timezone}
                      onValueChange={(value) => setProfileData({...profileData, timezone: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Nairobi">East Africa Time (Nairobi)</SelectItem>
                        <SelectItem value="Africa/Lagos">West Africa Time (Lagos)</SelectItem>
                        <SelectItem value="Africa/Cairo">Egypt Standard Time (Cairo)</SelectItem>
                        <SelectItem value="Africa/Johannesburg">South Africa Standard Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-5">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleProfileUpdate}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-blue-500" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Customize how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationUpdate} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => toggleNotificationSetting('emailNotifications')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Receive notifications via SMS
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={() => toggleNotificationSetting('smsNotifications')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Browser Notifications</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Receive push notifications in browser
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={() => toggleNotificationSetting('pushNotifications')}
                      />
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Frequency</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-digest">Email Digest Frequency</Label>
                    <Select 
                      value={notificationSettings.emailDigest}
                      onValueChange={(value) => setNotificationSettings({
                        ...notificationSettings,
                        emailDigest: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediately</SelectItem>
                        <SelectItem value="daily">Daily digest</SelectItem>
                        <SelectItem value="weekly">Weekly digest</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Tickets</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Get notified when new tickets are created
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.newTicketAlert}
                        onCheckedChange={() => toggleNotificationSetting('newTicketAlert')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Ticket Updates</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Get notified when your tickets are updated
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.ticketUpdatesAlert}
                        onCheckedChange={() => toggleNotificationSetting('ticketUpdatesAlert')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Updates</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Get notified about system maintenance and updates
                        </p>
                      </div>
                      <Switch 
                        checked={notificationSettings.systemUpdatesAlert}
                        onCheckedChange={() => toggleNotificationSetting('systemUpdatesAlert')}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-5">
              <Button variant="outline">Reset to Default</Button>
              <Button onClick={handleNotificationUpdate}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* System Settings (SuperAdmin Only) */}
        {user?.role === 'superadmin' && (
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5 text-blue-500" />
                  System Settings
                </CardTitle>
                <CardDescription>
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSystemUpdate} className="space-y-6">
                  <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/30">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                    <AlertTitle className="text-amber-800 dark:text-amber-500">Warning</AlertTitle>
                    <AlertDescription className="text-amber-700 dark:text-amber-400">
                      Changes to system settings will affect all users. Proceed with caution.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Company Information</h3>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input 
                          id="company-name" 
                          value={systemSettings.companyName}
                          onChange={e => setSystemSettings({...systemSettings, companyName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="default-industry">Default Industry</Label>
                        <Select 
                          value={systemSettings.defaultIndustry}
                          onValueChange={(value) => setSystemSettings({...systemSettings, defaultIndustry: value})}
                        >
                          <SelectTrigger id="default-industry">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ISP">ISP</SelectItem>
                            <SelectItem value="Hospital">Hospital</SelectItem>
                            <SelectItem value="University">University</SelectItem>
                            <SelectItem value="NGO">NGO</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="logo">Logo URL</Label>
                        <Input 
                          id="logo" 
                          value={systemSettings.logo}
                          onChange={e => setSystemSettings({...systemSettings, logo: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={systemSettings.primaryColor}
                            onChange={e => setSystemSettings({...systemSettings, primaryColor: e.target.value})}
                            className="h-10 w-10 rounded border"
                          />
                          <Input 
                            id="primary-color" 
                            value={systemSettings.primaryColor}
                            onChange={e => setSystemSettings({...systemSettings, primaryColor: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security & Sessions</h3>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <Input 
                          id="session-timeout"
                          type="number"
                          value={systemSettings.sessionTimeout}
                          onChange={e => setSystemSettings({
                            ...systemSettings, 
                            sessionTimeout: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ticket-auto-close">Auto-close Tickets After (days)</Label>
                        <Input 
                          id="ticket-auto-close"
                          type="number"
                          value={systemSettings.ticketAutoClose}
                          onChange={e => setSystemSettings({
                            ...systemSettings, 
                            ticketAutoClose: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Maintenance</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Put the system in maintenance mode (only superadmins can access)
                        </p>
                      </div>
                      <Switch 
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={() => setSystemSettings({
                          ...systemSettings, 
                          maintenanceMode: !systemSettings.maintenanceMode
                        })}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-5">
                <Button variant="outline">Reset to Default</Button>
                <Button onClick={handleSystemUpdate}>Save System Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default SettingsModule;
