const API_URL = "http://localhost:3000";

export interface SaveWorkflowPayload {
  name: string;

  nodes: any[];

  edges: any[];
}

export async function saveWorkflow(payload: SaveWorkflowPayload) {
  const response = await fetch(`${API_URL}/workflows`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erreur sauvegarde workflow");
  }

  return response.json();
}

export async function deleteWorkflow(id: string) {
  const response = await fetch(`${API_URL}/workflows/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erreur suppression workflow");
  }

  return response.json();
}

export async function getWorkflows() {
  const response = await fetch(`${API_URL}/workflows`);

  if (!response.ok) {
    throw new Error("Erreur récupération workflows");
  }

  return response.json();
}

export async function getWorkflow(id: string) {
  const response = await fetch(`${API_URL}/workflows/${id}`);

  if (!response.ok) {
    throw new Error("Erreur chargement workflow");
  }

  return response.json();
}
