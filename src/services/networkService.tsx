import axios from "axios";

const networkApi = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

export async function checkConnection(): Promise<boolean> {
  try {
    const response = await networkApi.head("/ping", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    return response.status >= 200 && response.status < 300;
  } catch (error) {
    return false;
  }
}