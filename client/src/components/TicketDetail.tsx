import React, { useState } from 'react';
import { Ticket } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Clock, User, Calendar, Edit, Save, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
  onUpdateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onBack, onUpdateTicket }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState<Ticket['status']>(ticket.status);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusUpdate = async () => {
    if (newStatus === ticket.status) {
      setIsEditing(false);
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onUpdateTicket(ticket.id, { 
        status: newStatus,
        updatedAt: new Date()
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      // In a real app, this would add the comment to the ticket
      setComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = (value: string) => {
    setNewStatus(value as Ticket['status']);
  };

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
      <div className="flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-slate-600 hover:text-slate-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tickets
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-800">Ticket #{ticket.id}</h1>
          <p className="text-slate-600">View and manage ticket details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Details */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl text-slate-800 mb-2">{ticket.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className={`${getStatusColor(ticket.status)} border`}>
                      {ticket.status}
                    </Badge>
                    <Badge className={`${getPriorityColor(ticket.priority)} border`}>
                      {ticket.priority}
                    </Badge>
                  </div>
                </div>
                {user?.role === 'admin' && (
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        size="sm"
                        className="border-slate-200 text-slate-700 hover:bg-slate-50"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Status
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleStatusUpdate}
                          disabled={isSubmitting}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(false);
                            setNewStatus(ticket.status);
                          }}
                          variant="outline"
                          size="sm"
                          className="border-slate-200 text-slate-700 hover:bg-slate-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isEditing && user?.role === 'admin' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Update Status
                    </label>
                    <Select value={newStatus} onValueChange={handleStatusChange}>
                      <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-slate-700 mb-2">Description</h3>
                  <p className="text-slate-600 leading-relaxed">{ticket.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Comments
              </CardTitle>
              <CardDescription>
                Conversation history and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample Comment */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">A</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700">Admin User</span>
                    <span className="text-xs text-slate-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Thank you for reporting this issue. We're currently investigating and will update you soon.
                  </p>
                </div>

                {/* Add Comment */}
                <div className="border-t border-slate-200 pt-4">
                  <div className="space-y-3">
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={3}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleAddComment}
                        disabled={!comment.trim() || isSubmitting}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                          <MessageSquare className="w-4 h-4 mr-2" />
                        )}
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Created by</p>
                  <p className="text-sm text-slate-600">{ticket.createdBy}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Created</p>
                  <p className="text-sm text-slate-600">
                    {ticket.createdAt.toLocaleDateString()} at {ticket.createdAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Last updated</p>
                  <p className="text-sm text-slate-600">
                    {ticket.updatedAt.toLocaleDateString()} at {ticket.updatedAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              {ticket.assignedTo && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Assigned to</p>
                    <p className="text-sm text-slate-600">{ticket.assignedTo}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
