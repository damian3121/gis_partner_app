import { AxiosError } from "axios";

export function isAxiosError(e: any): e is AxiosError {
  return e.response && e.response.data && e.response.status;
}

export function mapAxiosError<T>(
  e: any,
  mappings: { [key: number]: (e: AxiosError) => T }
): T {
  if (isAxiosError(e)) {
    const code = e.response!.status
    const mapping = mappings[code];
    if (mapping) {
      return mapping(e);
    } else {
      throw new Error('Request failed with status code: ' + code);
    }
  } else {
    throw e;
  }
}
