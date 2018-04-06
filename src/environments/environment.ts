// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  endPoint: "https://api.howizbiz.com/api",
  domain: "https://howizbiz.com/",
  avatarUrl: "https://api.howizbiz.com/avatars/",

  apiUrls: {
      'loginUrl': "/login",
  
      'userApi' : '/users'
  },

  getUrl: function (apiName: string) {

      return this.endPoint + this.apiUrls[apiName];
  },

  localStorageVariablesName: {

  }
}