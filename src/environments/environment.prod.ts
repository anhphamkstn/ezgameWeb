export const environment = {
  production: true,
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