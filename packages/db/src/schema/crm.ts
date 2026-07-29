import { pgTable, uuid, varchar, text, integer, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { businesses } from './business.js';

export const leadStageEnum = pgEnum('lead_stage', [
  'new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost',
]);

export const dealStageEnum = pgEnum('deal_stage', [
  'prospect', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost',
]);

export const contacts = pgTable('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  company: varchar('company', { length: 255 }),
  tags: text('tags').array().default([]),
  customFields: jsonb('custom_fields').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  contactId: uuid('contact_id').references(() => contacts.id).notNull(),
  source: varchar('source', { length: 100 }),
  score: integer('score').default(0),
  stage: leadStageEnum('stage').default('new').notNull(),
  assignedTo: varchar('assigned_to', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const deals = pgTable('deals', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  leadId: uuid('lead_id').references(() => leads.id),
  title: varchar('title', { length: 255 }).notNull(),
  value: integer('value').notNull(),
  stage: dealStageEnum('stage').default('prospect').notNull(),
  probability: integer('probability').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const interactions = pgTable('interactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  contactId: uuid('contact_id').references(() => contacts.id).notNull(),
  channel: varchar('channel', { length: 50 }).notNull(),
  direction: varchar('direction', { length: 10 }).notNull(),
  content: text('content').notNull(),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
