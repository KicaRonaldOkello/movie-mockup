// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: 'https://hebertazurefunctions.azurewebsites.net/api/',
  rave_publicKey: 'FLWPUBK_TEST-b7a6d0a478d201ceae721033e1f39c95-X',
  clientAllowedImageFormats: ['png', 'jpg', 'jpeg', 'gif'],
  clientAllowedVideoFormats: ['mp4', 'mov', 'avi', 'mpg', 'ogv', '3gp', '3g2'],
  clientAllowedAudioFormats: ['mp3', 'm4a', 'ogg', 'wav'],
  clientAllowedDocumentFormats: ['pdf', 'doc', 'ppt', 'odt', 'xls', 'psd'],
  maxImageFileSize: 5000000,
  maxVideoFileSize: 50000000,
  maxFileSizeForChats: 5000000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
