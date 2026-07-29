export interface Tool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (args: Record<string, unknown>, context: ToolContext) => Promise<unknown>;
}

export interface ToolContext {
  businessId: string;
  userId: string;
  agentId: string;
}

export const tools: Tool[] = [
  {
    name: 'send_whatsapp_message',
    description: 'Send a WhatsApp message to a contact',
    parameters: {
      to: { type: 'string', description: 'Phone number' },
      message: { type: 'string', description: 'Message content' },
    },
    execute: async (args, context) => {
      // TODO: Implement via WhatsApp API
      return { success: true, messageId: crypto.randomUUID() };
    },
  },
  {
    name: 'create_contact',
    description: 'Create a new contact in CRM',
    parameters: {
      name: { type: 'string', description: 'Contact name' },
      email: { type: 'string', description: 'Email address' },
      phone: { type: 'string', description: 'Phone number' },
    },
    execute: async (args, context) => {
      // TODO: Implement via DB
      return { success: true, contactId: crypto.randomUUID() };
    },
  },
  {
    name: 'create_invoice',
    description: 'Create an invoice for a contact',
    parameters: {
      contactId: { type: 'string', description: 'Contact ID' },
      items: { type: 'array', description: 'Invoice items' },
    },
    execute: async (args, context) => {
      // TODO: Implement via DB
      return { success: true, invoiceId: crypto.randomUUID() };
    },
  },
  {
    name: 'schedule_meeting',
    description: 'Schedule a meeting on the calendar',
    parameters: {
      title: { type: 'string', description: 'Meeting title' },
      date: { type: 'string', description: 'Date and time' },
      attendees: { type: 'array', description: 'Attendee emails' },
    },
    execute: async (args, context) => {
      // TODO: Implement via Calendar API
      return { success: true, eventId: crypto.randomUUID() };
    },
  },
  {
    name: 'generate_report',
    description: 'Generate an analytics report',
    parameters: {
      type: { type: 'string', description: 'Report type' },
      dateRange: { type: 'object', description: 'Start and end date' },
    },
    execute: async (args, context) => {
      // TODO: Implement via Analytics
      return { success: true, reportUrl: '/reports/generated' };
    },
  },
];

export function getToolByName(name: string): Tool | undefined {
  return tools.find((t) => t.name === name);
}

export function getToolsByNames(names: string[]): Tool[] {
  return names.map(getToolByName).filter(Boolean) as Tool[];
}
