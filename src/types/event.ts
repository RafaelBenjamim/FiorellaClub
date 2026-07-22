export interface Evento {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  maxAttendees: number;
  registeredCount: number;
  location: string | null;
  imageUrl: string | null;
}

export interface RegistrationRequest {
  eventId: string;
  name: string;
  email: string;
  phone: string;
}

export interface RegistrationResponse {
  id: string;
  eventId: string;
  name: string;
  status: string;
  paymentUrl: string;
}
