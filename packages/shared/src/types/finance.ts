export interface Invoice {
  id: string;
  businessId: string;
  contactId: string;
  number: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: InvoiceStatus;
  dueDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  currency: string;
  method: 'razorpay' | 'bank_transfer' | 'cash' | 'upi' | 'other';
  reference?: string;
  paidAt: Date;
}

export interface Expense {
  id: string;
  businessId: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  receiptUrl?: string;
  date: Date;
  createdAt: Date;
}
