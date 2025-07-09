
import React, { useState } from 'react';
import { Ticket } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { X, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TicketFormProps {
  onClose: () => void;
  onSubmit: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ onClose, onSubmit }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const newTicket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'> = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        status: 'Open',
        createdBy: user?.email || 'unknown@techcare.africa'
      };

      onSubmit(newTicket);
    } catch (error) {
      console.error('Failed to create ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-slate-800">Create New Ticket</CardTitle>
              <CardDescription className="text-slate-600">
                Submit a new support request
              </CardDescription>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the issue"
                required
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the issue, including steps to reproduce if applicable"
                required
                rows={5}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="block text-sm font-medium text-slate-700">
                Priority
              </label>
              <Select
                value={formData.priority}
                onValueChange={(value: 'Low' | 'Medium' | 'High') => 
                  setFormData(prev => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="Medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="High">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      High
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Ticket Information</p>
                  <ul className="space-y-1 text-blue-600">
                    <li>• Your ticket will be assigned a unique ID</li>
                    <li>• You'll receive email notifications for updates</li>
                    <li>• Response time varies based on priority level</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Create Ticket
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketForm;
