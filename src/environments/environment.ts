// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  endPoint: "http://45.77.243.115:8080/api/",
  domain: "http://45.77.243.115:8080",
  imageUrl: "http://45.77.243.115:8080/upload/",
  apiUrls: {
      'loginUrl': "login",
  
      'getProduct' : 'get-game',

      'catalog' : 'catalog',

      'getConfig' : 'config',

      'check-email' : 'check-email',

      'register' : 'register',

      'getProfileUrl': 'me',

      'checkToken' : 'check-token',

      'update-bio' : 'me/update-bio',

      'search' : 'search',

      'cart' : 'cart',

      'cartBaoKim' : 'cart-submit-baokim',

      'cartBank' : 'cart-submit',

      'change-password' :'change-password',

      'account-order' : 'account-order'

  },

  getUrl: function (apiName: string) {

      return this.endPoint + this.apiUrls[apiName];
  },

  localStorageVariablesName: {

  }
}