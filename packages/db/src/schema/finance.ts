import { pgTable, uuid, varchar, text, integer, timestamp, date, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { businesses } from './business.js';
import { contacts } from './crm.js';

export const invoiceStatusEnum = pgEnum('invoice_status', ['draft', 'pending', 'paid', 'overdue', 'cancelled']);

export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  contactId: uuid('contact_id').references(() => contacts.id).notNull(),
  number: varchar('number', { length: 50 }).notNull(),
  items: jsonb('items').$type<Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>>().notNull(),
  subtotal: integer('subtotal').notNull(),
  tax: integer('tax').default(0),
  total: integer('total').notNull(),
  status: invoiceStatusEnum('status').default('pending').notNull(),
  dueDate: date('due_date'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  invoiceId: uuid('invoice_id').references(() => invoices.id).notNull(),
  amount: integer('amount').notNull(),
  method: varchar('method', { length: 50 }).notNull(),
  reference: varchar('reference', { length: 255 }),
  paidAt: timestamp('paid_at').notNull(),
});

export const expenses = pgTable('expenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  amount: integer('amount').notNull(),
  description: text('description').notNull(),
  receiptUrl: varchar('receipt_url', { length: 500 }),
  date: date('date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
