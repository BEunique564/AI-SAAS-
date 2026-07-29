export interface Employee {
  id: string;
  businessId: string;
  userId: string;
  department: string;
  designation: string;
  joinDate: Date;
  salary?: number;
  status: 'active' | 'inactive' | 'on_leave';
  createdAt: Date;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: 'present' | 'absent' | 'half_day' | 'leave';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'sick' | 'casual' | 'earned' | 'maternity' | 'other';
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
}
