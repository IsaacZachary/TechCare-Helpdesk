
import React, { useState } from 'react';
import { PaymentPlan } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface MPesaPaymentModalProps {
  plan: PaymentPlan;
  onClose: () => void;
}

const MPesaPaymentModal: React.FC<MPesaPaymentModalProps> = ({ plan, onClose }) => {
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    setStep('processing');
    
    // Simulate M-Pesa STK push
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      
      // Simulate completion after success view
      setTimeout(() => {
        toast({
          title: "Payment successful!",
          description: `You have successfully subscribed to the ${plan.name} plan.`,
        });
        onClose();
      }, 3000);
    }, 3000);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>M-Pesa Payment</DialogTitle>
          <DialogDescription>
            Complete your payment for the {plan.name} plan (${plan.price}/month).
          </DialogDescription>
        </DialogHeader>
        
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter your M-Pesa number e.g., 07XX XXX XXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full"
                required
              />
              <p className="text-xs text-slate-500">
                You will receive an STK push notification to complete the payment.
              </p>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit">
                Pay ${plan.price}
              </Button>
            </DialogFooter>
          </form>
        )}
        
        {step === 'processing' && (
          <div className="py-8 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <div className="text-center">
              <h3 className="font-medium text-lg">Processing Payment</h3>
              <p className="text-slate-500">
                Check your phone for the M-Pesa prompt...
              </p>
            </div>
          </div>
        )}
        
        {step === 'success' && (
          <div className="py-8 flex flex-col items-center justify-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-lg">Payment Successful!</h3>
              <p className="text-slate-500">
                Thank you for subscribing to the {plan.name} plan.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Add Check icon since it wasn't imported
const Check = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default MPesaPaymentModal;
