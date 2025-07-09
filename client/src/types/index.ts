
export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  ticketId: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin' | 'user';
  isActive?: boolean;
  lastLogin?: Date;
  joinedAt?: Date;
  department?: string;
  accountType?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isBot?: boolean;
  threadId?: string;
  isOutbound?: boolean;
}

export interface MessageThread {
  id: string;
  sender: string;
  subject: string;
  timestamp: Date;
  lastMessage: string;
  unread: number;
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  duration: string;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  amount: number;
  planName: string;
  paymentMethod: string;
  status: 'Completed' | 'Pending' | 'Failed';
  transactionDate: Date;
  transactionId: string;
}

export interface SystemLog {
  id: string;
  action: string;
  userId: string;
  timestamp: Date;
  details: string;
  level: 'info' | 'warning' | 'error';
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  emailDigest: 'immediate' | 'daily' | 'weekly' | 'never';
  newTicketAlert: boolean;
  ticketUpdatesAlert: boolean;
  systemUpdatesAlert: boolean;
}

export interface SystemSettings {
  companyName: string;
  defaultIndustry: string;
  logo: string;
  primaryColor: string;
  sessionTimeout: number;
  ticketAutoClose: number;
  maintenanceMode: boolean;
}

export interface IndustryType {
  id: string;
  name: string;
  icon: any; // Simplified for mock data
  description: string;
  examples: string;
  color: string;
}
