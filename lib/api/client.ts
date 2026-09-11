import { ApiError, ApiErrorResponse, ApiRequestOptions } from "./types";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { params, body, ...fetchOptions } = options;

  const url = new URL(endpoint, NEXT_PUBLIC_API_BASE_URL);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const headers = new Headers(fetchOptions.headers);

  let serializedBody: BodyInit | undefined;

  if (body !== undefined) {
    headers.set("Content-Type", "application/json");
    serializedBody = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
    body: serializedBody,
  });

  if (!response.ok) {
    let errorBody: ApiErrorResponse | undefined;

    try {
      errorBody = await response.json();
    } catch {}
    console.log(errorBody);

    throw new ApiError(
      errorBody?.message ?? `Request failed with status ${response.status}`,
      response.status,
      {
        errors: errorBody?.errors,
        fieldErrors: errorBody?.fieldErrors,
      },
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
