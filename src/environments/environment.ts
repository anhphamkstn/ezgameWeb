// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  endPoint: "http://ezgamestore.com/api/",
  domain: "http://ezgamestore.com",
  imageUrl: "http://ezgamestore.com/upload/",
  apiUrls: {
      'loginUrl': "login",
  
      'getProduct' : 'get-game',

      'getConfig' : 'config',

      'check-email' : 'check-email',

      'register' : 'register',

      'getProfileUrl': 'me',

      'checkToken' : 'check-token',

      'update-bio' : 'me/update-bio'

  },

  getUrl: function (apiName: string) {

      return this.endPoint + this.apiUrls[apiName];
  },

  localStorageVariablesName: {

  }
}