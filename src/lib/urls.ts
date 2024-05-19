export function getBaseUrl() {
  return "http://localhost:8080";
}

export function getApiUrl() {
  return `${getBaseUrl()}/api`;
}

export function getCreatorPinUrl(creator_uid: string) {
  return `${getApiUrl()}/creator/${creator_uid}/pins`;
}
