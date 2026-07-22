import { API_BASE_URL, STORE_SLUG } from "../config/api";
import type { Evento } from "../types/event";

export async function getEventos(): Promise<Evento[]> {
  const response = await fetch(`${API_BASE_URL}/api/event/${STORE_SLUG}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) throw new Error("Erro ao buscar eventos.");

  return response.json();
}

export async function getEventoAtual(): Promise<Evento> {
  const response = await fetch(
    `${API_BASE_URL}/api/event/current/${STORE_SLUG}`,
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    },
  );

  if (!response.ok) throw new Error("Nenhum evento ativo no momento.");

  return response.json();
}
