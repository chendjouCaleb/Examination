const authUrl = 'https://regolia-id.azurewebsites.net';
export const environment = {
  production: true,
  HUB_URL: `/hubs`,
  SERVER_URL: '/api',
  AUTH_APP_URL: authUrl,
  AUTH_SERVER_URL: `${authUrl}/api`,
  AUTH_CODE_URL: `${authUrl}/oauth/authorize`,
  AUTH_CALLBACK_URL: 'https://regolia.azurewebsites.net/authorize/callback',
  AUTH_CLIENT_ID: 'a7d8c8e3-f4b7-41f6-9499-8f0f832ebfb5',
  AUTH_RETURN_URL: '/home'
};
