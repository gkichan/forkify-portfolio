// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    apiKey: "AIzaSyCw94tuFr_vwkPiiSSCpwkhB-VnbEJlHcQ",
    authDomain: "forkify-81065.firebaseapp.com",
    databaseURL: "https://forkify-81065.firebaseio.com",
    projectId: "forkify-81065",
    storageBucket: "forkify-81065.appspot.com",
    messagingSenderId: "268549602623"
  },
  apiKeyFood2Fork: 'fa69a3beb9e2b10840d64dcfd521b6aa',
  apiUrlFood2Fork: 'http://food2fork.com/api',
  proxy: 'https://cors.io/?'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
