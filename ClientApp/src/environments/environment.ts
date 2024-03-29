// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const host = isMobile() ? '192.168.43.24' : 'localhost';
const authUrl = `http://${host}:4000`;
export const environment = {
  production: false,
  HUB_URL: `/hubs`,
  SERVER_URL: `/api`,
  AUTH_APP_URL: authUrl,
  AUTH_SERVER_URL: authUrl + '/api',
  AUTH_CODE_URL: authUrl + '/oauth/authorize',
  AUTH_CALLBACK_URL: `http://${host}:9000/authorize/callback`,
  AUTH_CLIENT_ID: 'a7d8c8e3-f4b7-41f6-9499-8f0f832ebfb5',
  AUTH_RETURN_URL: '/home'
};

function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
