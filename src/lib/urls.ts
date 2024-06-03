export function getBaseUrl() {
  return import.meta.env.VITE_BASE_URL;
}

export function getApiUrl() {
  return `${getBaseUrl()}/api`;
}

export function getCreatorPinUrl(creator_uid: string) {
  return `${getApiUrl()}/creator/${creator_uid}/pins`;
}

export function deletePinUrl(pinId: number) {
  return `${getApiUrl()}/pins/${pinId}/pin`;
}

export function createPinUrl() {
  return `/api/pins`;
}

export function getPinByCategoryUrl(category: string) {
  return `${getApiUrl()}/pins/${category}/category`;
}
