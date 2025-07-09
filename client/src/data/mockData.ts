import { Ticket, User, PaymentRecord, SystemLog, ChatMessage, MessageThread } from '../types';

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Internet connection issues',
    description: 'My internet connection keeps dropping every 30 minutes.',
    priority: 'High',
    status: 'Open',
    createdBy: 'user@example.com',
    createdAt: new Date('2025-07-05T10:30:00'),
    updatedAt: new Date('2025-07-05T10:30:00'),
  },
  {
    id: '2',
    title: 'Billing discrepancy',
    description: 'I was charged for services I did not use this month.',
    priority: 'Medium',
    status: 'In Progress',
    createdBy: 'customer@example.com',
    createdAt: new Date('2025-07-04T14:20:00'),
    updatedAt: new Date('2025-07-05T09:15:00'),
    assignedTo: 'admin@example.com',
  },
  {
    id: '3',
    title: 'Router configuration',
    description: 'Need help setting up my new router with your service.',
    priority: 'Low',
    status: 'Resolved',
    createdBy: 'user@example.com',
    createdAt: new Date('2025-07-03T11:45:00'),
    updatedAt: new Date('2025-07-04T16:30:00'),
    assignedTo: 'admin@example.com',
  },
  {
    id: '4',
    title: 'Package upgrade request',
    description: 'I would like to upgrade from the basic to the premium package.',
    priority: 'Low',
    status: 'Closed',
    createdBy: 'customer@example.com',
    createdAt: new Date('2025-07-02T09:10:00'),
    updatedAt: new Date('2025-07-03T14:20:00'),
    assignedTo: 'admin@example.com',
  },
  {
    id: '5',
    title: 'Network speed test failed',
    description: 'The speed I am getting is much slower than what I am paying for.',
    priority: 'High',
    status: 'Open',
    createdBy: 'user@example.com',
    createdAt: new Date('2025-07-05T15:20:00'),
    updatedAt: new Date('2025-07-05T15:20:00'),
  },
  {
    id: '6',
    title: 'Cannot access streaming services',
    description: 'Netflix and other streaming services are not loading even though my internet is working.',
    priority: 'Medium',
    status: 'In Progress',
    createdBy: 'customer@example.com',
    createdAt: new Date('2025-07-04T16:40:00'),
    updatedAt: new Date('2025-07-05T11:30:00'),
    assignedTo: 'admin@example.com',
  },
  {
    id: '7',
    title: 'Installation appointment request',
    description: 'I need to schedule an appointment for new service installation.',
    priority: 'Medium',
    status: 'Open',
    createdBy: 'newuser@example.com',
    createdAt: new Date('2025-07-05T13:10:00'),
    updatedAt: new Date('2025-07-05T13:10:00'),
  },
  {
    id: '8',
    title: 'Missing channels in TV package',
    description: 'Several channels that should be included in my package are not available.',
    priority: 'Low',
    status: 'Resolved',
    createdBy: 'customer@example.com',
    createdAt: new Date('2025-07-03T14:50:00'),
    updatedAt: new Date('2025-07-04T10:15:00'),
    assignedTo: 'admin@example.com',
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'superadmin@example.com',
    name: 'Super Admin',
    role: 'superadmin',
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '3',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
  },
  {
    id: '4',
    email: 'customer@example.com',
    name: 'Customer Support',
    role: 'admin',
  },
  {
    id: '5',
    email: 'newuser@example.com',
    name: 'New User',
    role: 'user',
  }
];

// Mock Enhanced Users with additional fields
export const mockEnhancedUsers = [
  {
    id: '1',
    email: 'superadmin@example.com',
    name: 'Super Admin',
    role: 'superadmin',
    isActive: true,
    lastLogin: new Date('2025-07-08T09:30:00'),
    joinedAt: new Date('2024-01-15'),
    department: 'Management',
    accountType: 'Employee'
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    isActive: true,
    lastLogin: new Date('2025-07-07T14:45:00'),
    joinedAt: new Date('2024-02-10'),
    department: 'Support',
    accountType: 'Employee'
  },
  {
    id: '3',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2025-07-05T10:20:00'),
    joinedAt: new Date('2024-03-22'),
    department: 'Customer',
    accountType: 'Customer'
  },
  {
    id: '4',
    email: 'customer@example.com',
    name: 'Customer Support',
    role: 'admin',
    isActive: true,
    lastLogin: new Date('2025-07-08T08:15:00'),
    joinedAt: new Date('2024-01-30'),
    department: 'Support',
    accountType: 'Employee'
  },
  {
    id: '5',
    email: 'newuser@example.com',
    name: 'New User',
    role: 'user',
    isActive: false,
    joinedAt: new Date('2025-07-01'),
    department: 'Customer',
    accountType: 'Customer'
  },
  {
    id: '6',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'admin',
    isActive: true,
    lastLogin: new Date('2025-07-07T16:20:00'),
    joinedAt: new Date('2024-02-15'),
    department: 'Technical',
    accountType: 'Employee'
  },
  {
    id: '7',
    email: 'robert.chen@example.com',
    name: 'Robert Chen',
    role: 'admin',
    isActive: true,
    lastLogin: new Date('2025-07-08T11:45:00'),
    joinedAt: new Date('2024-03-10'),
    department: 'Technical',
    accountType: 'Employee'
  },
  {
    id: '8',
    email: 'sarah.johnson@example.com',
    name: 'Sarah Johnson',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2025-07-06T09:30:00'),
    joinedAt: new Date('2024-04-05'),
    department: 'Customer',
    accountType: 'Customer'
  },
  {
    id: '9',
    email: 'michael.wong@example.com',
    name: 'Michael Wong',
    role: 'admin',
    isActive: true,
    lastLogin: new Date('2025-07-07T10:15:00'),
    joinedAt: new Date('2024-02-28'),
    department: 'Support',
    accountType: 'Employee'
  },
  {
    id: '10',
    email: 'alex.miller@example.com',
    name: 'Alex Miller',
    role: 'user',
    isActive: false,
    lastLogin: new Date('2025-06-15T14:20:00'),
    joinedAt: new Date('2024-05-10'),
    department: 'Customer',
    accountType: 'Customer'
  }
];

// Mock Payments
export const mockPayments: PaymentRecord[] = [
  {
    id: '1',
    userId: '3',
    amount: 49.99,
    planName: 'Premium Support',
    paymentMethod: 'M-Pesa',
    status: 'Completed',
    transactionDate: new Date('2025-07-01'),
    transactionId: 'MP12345678'
  },
  {
    id: '2',
    userId: '5',
    amount: 29.99,
    planName: 'Standard Support',
    paymentMethod: 'Credit Card',
    status: 'Completed',
    transactionDate: new Date('2025-06-30'),
    transactionId: 'CC87654321'
  },
  {
    id: '3',
    userId: '8',
    amount: 99.99,
    planName: 'Enterprise Support',
    paymentMethod: 'Bank Transfer',
    status: 'Pending',
    transactionDate: new Date('2025-07-05'),
    transactionId: 'BT98765432'
  },
  {
    id: '4',
    userId: '3',
    amount: 49.99,
    planName: 'Premium Support',
    paymentMethod: 'M-Pesa',
    status: 'Completed',
    transactionDate: new Date('2025-06-01'),
    transactionId: 'MP23456789'
  },
  {
    id: '5',
    userId: '10',
    amount: 29.99,
    planName: 'Standard Support',
    paymentMethod: 'M-Pesa',
    status: 'Failed',
    transactionDate: new Date('2025-07-03'),
    transactionId: 'MP34567890'
  },
  {
    id: '6',
    userId: '8',
    amount: 99.99,
    planName: 'Enterprise Support',
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
    transactionDate: new Date('2025-06-15'),
    transactionId: 'BT45678901'
  },
  {
    id: '7',
    userId: '10',
    amount: 29.99,
    planName: 'Standard Support',
    paymentMethod: 'Credit Card',
    status: 'Completed',
    transactionDate: new Date('2025-05-30'),
    transactionId: 'CC56789012'
  }
];

// Mock System Logs
export const mockSystemLogs: SystemLog[] = [
  {
    id: '1',
    action: 'User Login',
    userId: '1',
    timestamp: new Date('2025-07-08T09:30:00'),
    details: 'Superadmin logged in from 192.168.1.1',
    level: 'info'
  },
  {
    id: '2',
    action: 'Ticket Created',
    userId: '3',
    timestamp: new Date('2025-07-05T10:30:00'),
    details: 'New ticket #1 created: Internet connection issues',
    level: 'info'
  },
  {
    id: '3',
    action: 'Ticket Status Change',
    userId: '2',
    timestamp: new Date('2025-07-05T11:45:00'),
    details: 'Ticket #2 status changed from Open to In Progress',
    level: 'info'
  },
  {
    id: '4',
    action: 'Failed Login Attempt',
    userId: '',
    timestamp: new Date('2025-07-07T14:20:00'),
    details: 'Failed login attempt for account user@example.com from 192.168.1.100',
    level: 'warning'
  },
  {
    id: '5',
    action: 'System Error',
    userId: '',
    timestamp: new Date('2025-07-06T23:15:00'),
    details: 'Database connection timeout during nightly backup',
    level: 'error'
  },
  {
    id: '6',
    action: 'User Role Change',
    userId: '1',
    timestamp: new Date('2025-07-04T16:30:00'),
    details: 'User role changed for newuser@example.com from user to admin',
    level: 'info'
  },
  {
    id: '7',
    action: 'Ticket Resolved',
    userId: '4',
    timestamp: new Date('2025-07-04T10:15:00'),
    details: 'Ticket #8 marked as resolved',
    level: 'info'
  },
  {
    id: '8',
    action: 'Payment Received',
    userId: '3',
    timestamp: new Date('2025-07-01T09:20:00'),
    details: 'Payment of $49.99 received for Premium Support plan',
    level: 'info'
  },
  {
    id: '9',
    action: 'Failed Payment',
    userId: '10',
    timestamp: new Date('2025-07-03T15:40:00'),
    details: 'Payment failed for Standard Support plan: insufficient funds',
    level: 'warning'
  },
  {
    id: '10',
    action: 'System Update',
    userId: '1',
    timestamp: new Date('2025-07-02T01:30:00'),
    details: 'System updated to version 2.4.3',
    level: 'info'
  }
];

// Mock Chat Messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    threadId: '1',
    content: "Hello, I'm having trouble with my internet connection. It keeps dropping every 30 minutes.",
    sender: 'Regular User',
    timestamp: new Date('2025-07-05T10:35:00'),
    isOutbound: false
  },
  {
    id: '2',
    threadId: '1',
    content: "I'm sorry to hear that. Can you tell me what type of router you're using?",
    sender: 'Customer Support',
    timestamp: new Date('2025-07-05T10:40:00'),
    isOutbound: true
  },
  {
    id: '3',
    threadId: '1',
    content: "I'm using the router provided by your company. It's a TP-Link Archer C7.",
    sender: 'Regular User',
    timestamp: new Date('2025-07-05T10:45:00'),
    isOutbound: false
  },
  {
    id: '4',
    threadId: '1',
    content: "Thank you for that information. Let's try resetting your router. Please unplug it for 30 seconds and then plug it back in.",
    sender: 'Customer Support',
    timestamp: new Date('2025-07-05T10:50:00'),
    isOutbound: true
  },
  {
    id: '5',
    threadId: '1',
    content: "I've done that already twice before contacting you, but the issue persists.",
    sender: 'Regular User',
    timestamp: new Date('2025-07-05T10:55:00'),
    isOutbound: false
  },
  {
    id: '6',
    threadId: '2',
    content: "I noticed a strange charge on my bill this month. I was charged for premium services that I didn't sign up for.",
    sender: 'Sarah Johnson',
    timestamp: new Date('2025-07-04T14:25:00'),
    isOutbound: false
  },
  {
    id: '7',
    threadId: '2',
    content: "I apologize for the confusion. Let me look into that for you. Can you provide your account number?",
    sender: 'Customer Support',
    timestamp: new Date('2025-07-04T14:30:00'),
    isOutbound: true
  },
  {
    id: '8',
    threadId: '3',
    content: "Hi, I'd like to upgrade my package from basic to premium. What would be the new monthly cost?",
    sender: 'Alex Miller',
    timestamp: new Date('2025-07-02T09:15:00'),
    isOutbound: false
  },
  {
    id: '9',
    threadId: '3',
    content: "Hello Alex, thank you for your interest in upgrading. The premium package costs $49.99 per month and includes all our advanced features.",
    sender: 'Customer Support',
    timestamp: new Date('2025-07-02T09:20:00'),
    isOutbound: true
  }
];

// Mock Message Threads
export const mockMessageThreads: MessageThread[] = [
  {
    id: '1',
    sender: 'Regular User',
    subject: 'Internet Connection Issues',
    timestamp: new Date('2025-07-05T10:35:00'),
    lastMessage: "I've done that already twice before contacting you, but the issue persists.",
    unread: 3
  },
  {
    id: '2',
    sender: 'Sarah Johnson',
    subject: 'Billing Discrepancy',
    timestamp: new Date('2025-07-04T14:25:00'),
    lastMessage: "I apologize for the confusion. Let me look into that for you. Can you provide your account number?",
    unread: 0
  },
  {
    id: '3',
    sender: 'Alex Miller',
    subject: 'Package Upgrade Inquiry',
    timestamp: new Date('2025-07-02T09:15:00'),
    lastMessage: "Hello Alex, thank you for your interest in upgrading. The premium package costs $49.99 per month and includes all our advanced features.",
    unread: 1
  },
  {
    id: '4',
    sender: 'Michael Wong',
    subject: 'Installation Appointment',
    timestamp: new Date('2025-07-01T13:45:00'),
    lastMessage: "I'd like to schedule an appointment for installing new equipment.",
    unread: 0
  },
  {
    id: '5',
    sender: 'Technical Support',
    subject: 'Network Speed Issues',
    timestamp: new Date('2025-06-30T11:20:00'),
    lastMessage: "Our team has identified the issue with your network speed. We'll send a technician tomorrow.",
    unread: 0
  },
  {
    id: '6',
    sender: 'Billing Department',
    subject: 'Payment Confirmation',
    timestamp: new Date('2025-06-28T09:30:00'),
    lastMessage: "We've received your payment of $49.99 for the July billing cycle. Thank you!",
    unread: 0
  }
];

// Add missing payment plans export
export const mockPaymentPlans = [
  {
    id: '1',
    name: 'Basic',
    price: 19.99,
    features: [
      'Up to 10 tickets per month',
      'Email support',
      'Basic reporting',
      'Standard response time'
    ],
    duration: 'monthly'
  },
  {
    id: '2',
    name: 'Professional',
    price: 49.99,
    features: [
      'Unlimited tickets',
      'Priority email & chat support',
      'Advanced reporting & analytics',
      'Faster response time',
      'Custom integrations',
      'Team collaboration tools'
    ],
    duration: 'monthly'
  },
  {
    id: '3',
    name: 'Enterprise',
    price: 99.99,
    features: [
      'Everything in Professional',
      'Dedicated support manager',
      'Custom branding',
      'API access',
      'Advanced security features',
      'SLA guarantees',
      'On-premise deployment option'
    ],
    duration: 'monthly'
  }
];

// Add payment history export (alias for existing mockPayments)
export const mockPaymentHistory = mockPayments;

// Add bot messages export
export const mockBotMessages = [
  {
    id: '1',
    content: "Hello! I'm your TechCare assistant. How can I help you today?",
    sender: 'TechCare Bot',
    timestamp: new Date(),
    isBot: true
  }
];
