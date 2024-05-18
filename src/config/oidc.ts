export const oidcConfig = {
  authority: import.meta.env.VITE_AUTHORITY,
  clientId: import.meta.env.VITE_CLIENT_ID,
  responseType: import.meta.env.VITE_RESPONSE_TYPE,
  scope: import.meta.env.VITE_SCOPE,
  redirectUri: import.meta.env.VITE_REDIRECT_URI,
  postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,
  automaticSilentRenew: import.meta.env.VITE_AUTOMATIC_SILENT_RENEW,
};
