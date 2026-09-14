export interface Evento {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;  
  discountPercentage: number;
  maxAttendees: number;
  registeredCount: number;
  location: string | null;
  imageUrl: string | null;
} 

export type UpdateEventDto = Omit<Evento, "id" | "registeredCount">;

export interface FormData {
  name: string;
  email: string;
  phone: string;
}

