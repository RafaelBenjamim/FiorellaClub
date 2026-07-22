import { API_BASE_URL } from "../config/api";
import type { RegistrationRequest, RegistrationResponse } from "../types/event";

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
