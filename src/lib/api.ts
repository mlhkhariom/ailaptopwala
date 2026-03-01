// Direct API client without Supabase dependency

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:54321/functions/v1';

async function callApi<T>(action: string, data?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/postgres-api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action, data }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;
}

async function uploadToCloudinary(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/cloudinary-upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload Error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;
}

export { callApi, uploadToCloudinary };
