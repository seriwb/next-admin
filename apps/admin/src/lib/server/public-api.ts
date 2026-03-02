import "server-only";
import type { FetchError } from "@/types/app";

const API_BASE_URL = process.env.INTERNAL_API_URL ?? "http://localhost:3500";

const serverFetchWithTimeout = async (
  url: string,
  method: string,
  body?: string,
  timeout = 10000
): Promise<Response> => {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  console.log(`Server ${method} request to:`, fullUrl);

  const controller = new AbortController();
  const timer = setTimeout(() => {
    console.error(`Server ${method} ${fullUrl} timeout!`);
    controller.abort();
  }, timeout);

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
    headers["Content-Length"] = `${Buffer.from(body, "utf8").length}`;
  }

  const options: RequestInit = {
    method,
    body,
    headers,
    signal: controller.signal,
    cache: "no-store",
  };

  const response = await fetch(fullUrl, options);
  clearTimeout(timer);

  return response;
};

const parseResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get("Content-Type");
  if (contentType?.startsWith("application/json")) {
    return (await response.json()) as T;
  }
  const fetchError: FetchError = {
    name: "admin-api public fetch error",
    message: "APIデータ取得エラー",
    status: response.status,
    statusText: response.statusText,
  };
  throw fetchError;
};

export async function serverGet<T>(url: string): Promise<T> {
  const response = await serverFetchWithTimeout(url, "GET");
  return parseResponse<T>(response);
}

export async function serverPost<T>(url: string, data: unknown): Promise<T> {
  const body = JSON.stringify(data);
  const response = await serverFetchWithTimeout(url, "POST", body);
  return parseResponse<T>(response);
}

export async function serverPut<T>(url: string, data: unknown): Promise<T> {
  const body = JSON.stringify(data);
  const response = await serverFetchWithTimeout(url, "PUT", body);
  return parseResponse<T>(response);
}

export async function serverPatch<T>(url: string, data: unknown): Promise<T> {
  const body = JSON.stringify(data);
  const response = await serverFetchWithTimeout(url, "PATCH", body);
  return parseResponse<T>(response);
}

export async function serverDelete<T>(url: string): Promise<T> {
  const response = await serverFetchWithTimeout(url, "DELETE");
  return parseResponse<T>(response);
}
