export interface User {
  id: string;
  name: string;
  email: string;
  role: 'mother' | 'doula';
  location: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  type: 'prenatal' | 'birth' | 'postpartum';
  notes?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'yoga' | 'workshop' | 'support-group';
  imageUrl: string;
}