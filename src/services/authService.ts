import { API_BASE_URL } from "../config/api";

export async function login(email: string, password: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Email ou senha inválidos.");

  const data = await response.json();
  return data.token;
}