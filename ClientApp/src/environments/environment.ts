// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SERVER_URL: 'http://localhost:9000/api',
  AUTH_APP_URL: 'http://localhost:4000',
  AUTH_SERVER_URL: 'http://localhost:4000/api',
  AUTH_URL: 'http://localhost:4000/auth/authorize',
  AUTH_CALLBACK_URL: 'http://localhost:9200/authorize/callback',
  AUTH_CLIENT_ID: 'b59d6be9-6d71-478f-bd70-843154b2fc4a',
  AUTH_SECRET_CODE: '28915824-e9ae-40f5-a943-499d382ee679',
  AUTH_RETURN_URL: '/home'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
