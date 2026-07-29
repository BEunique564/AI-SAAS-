import { pgTable, uuid, varchar, integer, date, timestamp, text, pgEnum } from 'drizzle-orm/pg-core';
import { businesses, users } from './business.js';

export const employeeStatusEnum = pgEnum('employee_status', ['active', 'inactive', 'on_leave']);
export const attendanceStatusEnum = pgEnum('attendance_status', ['present', 'absent', 'half_day', 'leave']);
export const leaveStatusEnum = pgEnum('leave_status', ['pending', 'approved', 'rejected']);

export const employees = pgTable('employees', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  userId: uuid('user_id').references(() => users.id),
  department: varchar('department', { length: 100 }).notNull(),
  designation: varchar('designation', { length: 100 }).notNull(),
  joinDate: date('join_date').notNull(),
  salary: integer('salary'),
  status: employeeStatusEnum('status').default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const attendance = pgTable('attendance', {
  id: uuid('id').primaryKey().defaultRandom(),
  employeeId: uuid('employee_id').references(() => employees.id).notNull(),
  date: date('date').notNull(),
  checkIn: timestamp('check_in'),
  checkOut: timestamp('check_out'),
  status: attendanceStatusEnum('status').default('present').notNull(),
});

export const leaveRequests = pgTable('leave_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  employeeId: uuid('employee_id').references(() => employees.id).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  reason: text('reason').notNull(),
  status: leaveStatusEnum('status').default('pending').notNull(),
  approvedBy: varchar('approved_by', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
