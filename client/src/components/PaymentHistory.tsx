import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PaymentRecord } from '../types';
import { mockPaymentHistory } from '../data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const PaymentHistory: React.FC = () => {
  const { user } = useAuth();
  
  // Filter payment history for current user
  const userPayments = mockPaymentHistory.filter(
    payment => user && payment.userId === user.id
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'Failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Payment History</h1>
        <p className="text-slate-600 dark:text-slate-400">
          View your recent payments and transactions
        </p>
      </div>

      <div className="border rounded-md overflow-hidden">
        {userPayments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.transactionId}</TableCell>
                  <TableCell>{formatDate(payment.transactionDate)}</TableCell>
                  <TableCell>{payment.planName}</TableCell>
                  <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">No payment history found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
