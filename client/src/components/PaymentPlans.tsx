import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PaymentPlan } from '../types';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPaymentPlans } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';
import MPesaPaymentModal from './MPesaPaymentModal';

const PaymentPlans: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchase = (plan: PaymentPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Payment Plans</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Choose the right plan for your business needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPaymentPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`${
              theme === 'dark'
                ? 'bg-slate-800 text-slate-100 hover:bg-slate-700'
                : 'bg-white hover:bg-slate-50'
            } transition-colors duration-200 border ${
              plan.name === 'Professional' 
                ? 'border-blue-300 shadow-md' 
                : 'border-slate-200'
            }`}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{plan.name}</span>
                {plan.name === 'Professional' && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-slate-500 dark:text-slate-400"> / month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handlePurchase(plan)}
                className={`w-full ${
                  plan.name === 'Professional'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : ''
                }`}
              >
                Subscribe Now
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {isModalOpen && selectedPlan && (
        <MPesaPaymentModal 
          plan={selectedPlan}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PaymentPlans;
