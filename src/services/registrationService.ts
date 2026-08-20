import { API_BASE_URL } from "../config/api";
import type { RegistrationRequest, RegistrationResponse, ConfirmacaoResponse } from "../types/event";

export async function createRegistration(
  data: RegistrationRequest,
): Promise<RegistrationResponse> {
  const response = await fetch(`${API_BASE_URL}/api/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}

export async function getConfirmacao(id: string): Promise<ConfirmacaoResponse> {
  const response = await fetch(`${API_BASE_URL}/api/registrations/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) throw new Error("Inscrição não encontrada.");

  return response.json();
}