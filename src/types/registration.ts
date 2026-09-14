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

export interface ConfirmacaoResponse{
  id: string;
  name: string;
  title: string;
  date: string;
  location?: string;
  status: number;

}