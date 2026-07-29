import { pgTable, uuid, varchar, text, integer, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { businesses } from './business.js';
import { contacts } from './crm.js';

export const agentStatusEnum = pgEnum('agent_status', ['active', 'inactive', 'error']);
export const conversationStatusEnum = pgEnum('conversation_status', ['active', 'closed', 'archived']);

export const agents = pgTable('agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  config: jsonb('config').$type<Record<string, unknown>>().default({}),
  prompt: text('prompt').notNull(),
  tools: text('tools').array().default([]),
  permissions: jsonb('permissions').$type<Record<string, boolean>>().default({}),
  status: agentStatusEnum('status').default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  agentId: uuid('agent_id').references(() => agents.id).notNull(),
  contactId: uuid('contact_id').references(() => contacts.id),
  channel: varchar('channel', { length: 50 }).notNull(),
  status: conversationStatusEnum('status').default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').references(() => conversations.id).notNull(),
  role: varchar('role', { length: 20 }).notNull(),
  content: text('content').notNull(),
  tokensUsed: integer('tokens_used'),
  model: varchar('model', { length: 100 }),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const agentMemories = pgTable('agent_memories', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').references(() => agents.id).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  content: text('content').notNull(),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
