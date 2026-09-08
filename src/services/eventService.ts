import { API_BASE_URL, STORE_SLUG } from "../config/api";
import type { Evento } from "../types/event";
import type { UpdateEventDto } from "../types/event";

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

export const deleteEvento = async (eventId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/event/deleteEvent/${eventId}`, {
    method: "DELETE",
    headers: {
      "ngrok-skip-browser-warning": "true",
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar o evento.");
  }
}

export const editarEvento = async (eventId: string, eventData: UpdateEventDto) => {
  const response = await fetch(`${API_BASE_URL}/api/event/updateEvent/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", 
      "ngrok-skip-browser-warning": "true"
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar o evento.");
  }
}

export const getEventoById = async (id: string): Promise<Evento> => {
  const response = await fetch(`${API_BASE_URL}/api/event/GetEventById/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do evento.");
  }

  return response.json();
};